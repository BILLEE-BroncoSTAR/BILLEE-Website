/* BILL-EE website. Content comes from site-config.js; this file only builds the page. */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var links = cfg.links || {};
  var mqMobile = window.matchMedia("(max-width: 760px)");

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function initials(name) {
    return (name || "?").split(/\s+/).map(function (w) { return w.charAt(0); }).slice(0, 2).join("").toUpperCase();
  }
  /* Photos hosted on Google (Drive / Photos) must be requested without the
     visitor's Google login or the page address, or Google can refuse them. */
  function isRemote(src) { return /^https?:\/\//.test(src || "") && src.indexOf(location.host) === -1; }
  function prep(img, src) {
    if (!isRemote(src)) return;
    img.referrerPolicy = "no-referrer";
    /* Drive photos also load without cookies; Google Photos album links do not allow that */
    if (/googleusercontent\.com\/d\//.test(src)) img.crossOrigin = "anonymous";
    else img.removeAttribute("crossorigin");
  }
  function setSrc(img, src, onFail) {
    prep(img, src);
    var tries = 0;
    img.addEventListener("error", function retry() {
      if (tries === 0 && /googleusercontent\.com/.test(src)) {
        tries = 1;
        setTimeout(function () { img.src = src.replace(/=w(\d+)/, function (m, w) { return "=w" + (+w + 1); }); }, 600);
        return;
      }
      img.removeEventListener("error", retry);
      if (onFail) onFail();
    });
    img.src = src;
    return img;
  }
  /* bigger version of a Google-hosted photo for the photo viewer */
  function large(src) { return /googleusercontent\.com/.test(src) ? src.replace(/=w\d+.*$/, "=w2400") : src; }
  function sized(src, w) { return /googleusercontent\.com/.test(src) ? src.replace(/=w\d+.*$/, "=w" + w) : src; }

  /* ---------- links ---------- */
  [].forEach.call(document.querySelectorAll("[data-link]"), function (a) {
    var href = links[a.getAttribute("data-link")];
    if (href) a.href = href; else a.hidden = true;
  });
  if (links.email) {
    $("emailLink").href = "mailto:" + links.email;
    $("emailText").textContent = links.email;
  } else { $("emailLink").hidden = true; }

  [].forEach.call(document.querySelectorAll("img[data-hide-on-error]"), function (img) {
    function hide() { img.style.display = "none"; }
    if (img.complete && !img.naturalWidth) hide(); else img.addEventListener("error", hide);
  });
  $("year").textContent = new Date().getFullYear();
  if (cfg.cppLogo) { $("cppLogo").hidden = false; setSrc($("cppLogo"), cfg.cppLogo, function () { $("cppLogo").hidden = true; }); }

  /* ---------- header + mobile menu ---------- */
  var header = $("header"), nav = $("nav"), menuBtn = $("menuBtn");
  function onScroll() { header.classList.toggle("solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function closeMenu() { nav.classList.remove("open"); header.classList.remove("menu-open"); menuBtn.setAttribute("aria-expanded", "false"); }
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    header.classList.toggle("menu-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- hero ---------- */
  (function hero() {
    var h = cfg.hero || {};
    $("heroEyebrow").textContent = h.eyebrow || "";
    $("heroTitle").textContent = h.title || "BILL-EE";
    $("heroTagline").textContent = h.tagline || "";
    var media = $("heroMedia");
    if (h.videoFile && !mqMobile.matches) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      if (h.image) v.poster = h.image;
      v.src = h.videoFile;
      media.appendChild(v);
    } else if (h.image) {
      var img = new Image(); img.alt = ""; img.decoding = "async";
      img.onload = function () { media.classList.add("loaded"); };
      setSrc(img, mqMobile.matches ? sized(h.image, 1400) : h.image);
      media.appendChild(img);
    }
    $("heroCoords").textContent = h.coordinates || "";
    $("heroPlace").textContent = h.place || "";
    if (!h.coordinates && !h.place) document.querySelector(".readout").hidden = true;
    $("footCoords").textContent = h.coordinates ? h.coordinates + "  ·  " + (h.place || "") : "";
    (h.stats || []).forEach(function (st) {
      var li = el("li"); li.appendChild(el("b", "", st.value)); li.appendChild(el("span", "", st.label));
      $("heroStats").appendChild(li);
    });
    if (h.youtube) {
      var yt = $("heroYoutube");
      yt.href = h.youtube; yt.textContent = h.youtubeLabel || "Watch the video"; yt.hidden = false;
    }
  })();

  /* ---------- about ---------- */
  (function about() {
    var a = cfg.about || {};
    (a.paragraphs || []).forEach(function (p) { $("aboutText").appendChild(el("p", "", p)); });
    if (a.teamPhoto) { $("teamPhoto").alt = a.teamPhotoAlt || "The BILL-EE team"; setSrc($("teamPhoto"), a.teamPhoto, function () { $("teamPhoto").parentNode.hidden = true; }); }
    else $("teamPhoto").parentNode.hidden = true;
    if (a.goal) { $("goalTitle").textContent = a.goalTitle || "Our Goal"; $("goalText").textContent = a.goal; $("goalBox").hidden = false; }
  })();

  /* ---------- tabs helper ---------- */
  function makeTabs(tabHost, panelHost, items, labelOf, buildPanel, idPrefix) {
    var btns = [], panels = [];
    items.forEach(function (item, i) {
      var b = el("button", "tab", labelOf(item));
      b.type = "button";
      b.id = idPrefix + "-tab-" + i;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", idPrefix + "-panel-" + i);
      b.addEventListener("click", function () { select(i, true); });
      b.addEventListener("keydown", function (e) {
        var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (k) { e.preventDefault(); var n = (i + k + items.length) % items.length; select(n, true); btns[n].focus(); }
      });
      tabHost.appendChild(b); btns.push(b);

      var p = el("div", "panel");
      p.id = idPrefix + "-panel-" + i;
      p.setAttribute("role", "tabpanel");
      p.setAttribute("aria-labelledby", b.id);
      buildPanel(p, item, i);
      panelHost.appendChild(p); panels.push(p);
    });
    var api = { current: 0, onChange: null };
    function select(i, user) {
      btns.forEach(function (b, j) {
        b.setAttribute("aria-selected", j === i ? "true" : "false");
        b.tabIndex = j === i ? 0 : -1;
      });
      panels.forEach(function (p, j) { p.hidden = j !== i; });
      api.current = i;
      if (user && btns[i].scrollIntoView && tabHost.scrollWidth > tabHost.clientWidth) {
        tabHost.scrollTo({ left: btns[i].offsetLeft - 16, behavior: "smooth" });
      }
      if (api.onChange) api.onChange(i);
    }
    api.select = select;
    select(0, false);
    return api;
  }

  function addParagraphs(host, list) { (list || []).forEach(function (t) { host.appendChild(el("p", "", t)); }); }
  function addList(host, list, cls) {
    if (!list || !list.length) return;
    var ul = el("ul", cls || "ticks");
    list.forEach(function (t) { ul.appendChild(el("li", "", t)); });
    host.appendChild(ul);
  }

  /* ---------- rover subsystems ---------- */
  var videos = [];
  var speed = +cfg.roverSpeed > 0 ? +cfg.roverSpeed : 0.6;

  var roverTabs = makeTabs($("roverTabs"), $("roverPanels"), cfg.subsystems || [],
    function (s) { return s.tab || s.title; },
    function (panel, s, i) {
      panel.classList.add("sys-panel");
      var media = el("div", "sys-media");

      /* desktop: exploded view video. phones: a photo instead */
      var vwrap = el("div", "sys-video");
      if (s.video) {
        var v = document.createElement("video");
        v.muted = true; v.playsInline = true; v.preload = "none";
        v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
        v.disablePictureInPicture = true;
        if (s.poster) v.poster = s.poster;
        v.setAttribute("aria-label", (s.title || "") + " exploded view");
        v.dataset.src = s.video;
        var replay = el("button", "replay", "Replay");
        replay.type = "button";
        replay.hidden = true;
        replay.addEventListener("click", function () { v.currentTime = 0; v.playbackRate = speed; v.play(); replay.hidden = true; });
        v.addEventListener("ended", function () { replay.hidden = false; });
        v.addEventListener("error", function () { media.classList.add("no-video"); });
        vwrap.appendChild(v); vwrap.appendChild(replay);
        if (cfg.explodedLabel) vwrap.appendChild(el("span", "model-chip", cfg.explodedLabel));
        videos[i] = v;
      } else { media.classList.add("no-video"); }
      media.appendChild(vwrap);

      if (s.photo) {
        var ph = el("div", "sys-photo");
        var im = new Image(); im.alt = s.title || ""; im.loading = "lazy";
        setSrc(im, sized(s.photo, 1000), function () { ph.hidden = true; });
        ph.appendChild(im); media.appendChild(ph);
      }
      if (s.note) media.appendChild(el("p", "sys-note", s.note));

      var body = el("div", "sys-body");
      body.appendChild(el("h3", "", s.title || ""));
      addParagraphs(body, s.paragraphs);
      if (s.parts && s.parts.length) {
        var dl = el("dl", "parts");
        s.parts.forEach(function (p) { dl.appendChild(el("dt", "", p.name)); dl.appendChild(el("dd", "", p.text)); });
        body.appendChild(dl);
      }
      addList(body, s.specs, "specs");
      if (s.missions && s.missions.length) {
        var m = el("p", "mission-tags");
        m.appendChild(el("span", "mt-label", "URC missions"));
        s.missions.forEach(function (x) { m.appendChild(el("span", "tag", x)); });
        body.appendChild(m);
      }
      panel.appendChild(media); panel.appendChild(body);
    }, "sys");

  /* play the visible subsystem's video once, only on larger screens, only when on screen */
  var roverVisible = false;
  function playCurrent() {
    if (mqMobile.matches) return;
    videos.forEach(function (v, j) { if (v && j !== roverTabs.current) v.pause(); });
    var v = videos[roverTabs.current];
    if (!v || !roverVisible) return;
    if (!v.src) v.src = v.dataset.src;
    if (v.ended || v.currentTime > 0) return;
    v.playbackRate = speed;
    var pr = v.play(); if (pr && pr.catch) pr.catch(function () {});
  }
  roverTabs.onChange = function () {
    var v = videos[roverTabs.current];
    if (v && v.src && !mqMobile.matches) { v.currentTime = 0; v.parentNode.querySelector(".replay").hidden = true; }
    playCurrent();
  };
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      roverVisible = en[0].isIntersecting;
      if (roverVisible) playCurrent();
      else videos.forEach(function (v) { if (v) v.pause(); });
    }, { threshold: 0.35 }).observe($("roverPanels"));
  }

  /* ---------- subteams ---------- */
  function leadCard(l) {
    var c = el("figure", "lead");
    var ph = el("div", "lead-photo");
    if (l.photo) {
      var im = new Image(); im.alt = l.name || ""; im.loading = "lazy";
      setSrc(im, l.photo, function () { im.remove(); ph.classList.add("blank"); ph.appendChild(el("span", "ini", initials(l.name))); });
      ph.appendChild(im);
    } else {
      ph.classList.add("blank");
      ph.appendChild(el("span", "ini", initials(l.name)));
    }
    c.appendChild(ph);
    var cap = el("figcaption");
    cap.appendChild(el("strong", "", l.name || ""));
    cap.appendChild(el("span", "", l.role || ""));
    c.appendChild(cap);
    return c;
  }

  function embed(src, title) {
    var yt = (src || "").match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
    if (yt) {
      var a = el("a", "btn btn-outline", "Watch: " + title);
      a.href = "https://www.youtube.com/watch?v=" + yt[1]; a.target = "_blank"; a.rel = "noopener";
      return a;
    }
    if (/\.(mp4|webm|mov)$/i.test(src)) {
      var v = document.createElement("video");
      v.controls = true; v.preload = "metadata"; v.playsInline = true; v.src = src; v.className = "embed-video";
      return v;
    }
    var f = document.createElement("iframe");
    f.src = src; f.title = title; f.loading = "lazy"; f.className = "embed-doc";
    return f;
  }

  makeTabs($("teamTabs"), $("teamPanels"), cfg.subteams || [],
    function (t) { return t.name; },
    function (panel, t) {
      panel.classList.add("team-panel");
      var main = el("div", "team-main");
      main.appendChild(el("h3", "", t.name + " Team"));
      main.appendChild(el("p", "excerpt", t.excerpt || ""));
      if (t.urc) {
        main.appendChild(el("h4", "", "Role in URC"));
        main.appendChild(el("p", "", t.urc));
      }
      if (t.focus && t.focus.length) {
        main.appendChild(el("h4", "", "This season"));
        addList(main, t.focus, "ticks");
      }
      if (t.missionSteps && t.missionSteps.length) {
        main.appendChild(el("h4", "", "The science mission"));
        var ol = el("ol", "steps");
        t.missionSteps.forEach(function (s) { ol.appendChild(el("li", "", s)); });
        main.appendChild(ol);
      }
      if (t.procedureVideo) { main.appendChild(el("h4", "", "Science module procedure")); main.appendChild(embed(t.procedureVideo, "Science module procedure")); }
      if (t.experimentDoc) { main.appendChild(el("h4", "", "Science experiment document")); main.appendChild(embed(t.experimentDoc, "Science experiment document")); }

      var ls = (t.links || []).filter(function (l) { return l.href || l.soon; });
      if (ls.length) {
        var row = el("div", "team-links");
        ls.forEach(function (l) {
          if (l.href) {
            var a = el("a", "link-arrow", l.label); a.href = l.href; a.target = "_blank"; a.rel = "noopener";
            row.appendChild(a);
          } else {
            var s = el("span", "link-soon", l.label);
            s.appendChild(el("em", "", "Coming soon"));
            row.appendChild(s);
          }
        });
        main.appendChild(row);
      }

      var side = el("aside", "team-leads");
      side.appendChild(el("p", "kicker", (t.leads || []).length > 1 ? "Leads" : "Lead"));
      var grid = el("div", "lead-grid" + ((t.leads || []).length > 1 ? " two" : ""));
      (t.leads || []).forEach(function (l) { grid.appendChild(leadCard(l)); });
      side.appendChild(grid);

      panel.appendChild(main); panel.appendChild(side);
    }, "team");

  /* ---------- URC ---------- */
  (function urc() {
    var u = cfg.urc || {};
    $("urcWhat").textContent = u.whatIs || "";
    $("urcWhy").textContent = u.why || "";
    $("urcBenefit").textContent = u.benefit || "";
    (u.missions || []).forEach(function (m) {
      var li = el("li", "m" + ((u.missions.indexOf(m) % 4) + 1));
      li.appendChild(el("strong", "", m.name));
      li.appendChild(el("span", "", m.text));
      $("urcMissions").appendChild(li);
    });
    if (u.photo) setSrc($("urcPhoto"), sized(u.photo, 1000), function () { $("urcPhoto").parentNode.hidden = true; });
    else $("urcPhoto").parentNode.hidden = true;
  })();

  /* ---------- gallery + photo viewer ---------- */
  (function gallery() {
    var items = (cfg.gallery || []).filter(Boolean);
    var grid = $("galleryGrid"), lb = $("lightbox"), lbImg = $("lbImg"), cur = 0, last = null;
    var shown = [];
    items.forEach(function (src) {
      var b = el("button", "shot"); b.type = "button"; b.setAttribute("aria-label", "Open photo");
      var im = new Image(); im.alt = ""; im.loading = "lazy"; im.decoding = "async";
      setSrc(im, sized(src, 900), function () { b.remove(); shown = shown.filter(function (s) { return s !== src; }); });
      b.appendChild(im);
      b.addEventListener("click", function () { open(shown.indexOf(src)); });
      grid.appendChild(b); shown.push(src);
    });
    function show(i) { cur = (i + shown.length) % shown.length; var u = large(shown[cur]); prep(lbImg, u); lbImg.src = u; }
    function open(i) { last = document.activeElement; show(i); lb.hidden = false; document.body.classList.add("no-scroll"); $("lbClose").focus(); }
    function close() { lb.hidden = true; lbImg.removeAttribute("src"); document.body.classList.remove("no-scroll"); if (last) last.focus(); }
    $("lbClose").addEventListener("click", close);
    $("lbPrev").addEventListener("click", function () { show(cur - 1); });
    $("lbNext").addEventListener("click", function () { show(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(cur - 1);
      else if (e.key === "ArrowRight") show(cur + 1);
    });
    var sx = null;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
      sx = null;
    }, { passive: true });
  })();

  /* ---------- resources ---------- */
  (function resources() {
    var host = $("resourceList");
    (cfg.resources || []).forEach(function (g) {
      var items = (g.items || []).filter(function (r) { return r.href || r.soon; });
      if (!items.length) return;
      var block = el("div", "res-group");
      block.appendChild(el("h3", "", g.group));
      var ul = el("ul", "res-list");
      items.forEach(function (r) {
        var li = el("li");
        var row = r.href ? el("a", "res-row") : el("div", "res-row soon");
        if (r.href) { row.href = r.href; row.target = "_blank"; row.rel = "noopener"; }
        var t = el("div", "res-text");
        t.appendChild(el("strong", "", r.title));
        if (r.detail) t.appendChild(el("span", "", r.detail));
        row.appendChild(t);
        row.appendChild(el("span", "res-tag", r.href ? r.tag || "Link" : "Coming soon"));
        li.appendChild(row); ul.appendChild(li);
      });
      block.appendChild(ul);
      host.appendChild(block);
    });
  })();
})();
