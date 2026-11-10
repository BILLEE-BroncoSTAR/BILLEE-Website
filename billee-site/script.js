(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var links = cfg.links || {};
  var reduce = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  document.documentElement.classList.add("js");

  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var ICONS = {
    github: '<svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
    slides: '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M6 2.5h8.5L19 7v14.5H6z"/><path d="M14.5 2.5V7H19"/><rect x="8.5" y="11" width="8" height="5.5" rx=".8"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    prev: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
    play: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z"/></svg>',
    replay: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.6-5.9"/><path d="M4 4v5h5"/></svg>'
  };

  /* ---------- Images that fail to load ---------- */
  function applyFallback(img) {
    var mode = img.getAttribute("data-fallback");
    if (mode === "hide") { img.style.display = "none"; }
    else if (mode === "hide-fig") { (img.closest("figure, .sat") || img).style.display = "none"; }
    else if (mode === "missing") { img.classList.add("missing"); }
    else if (mode === "wordmark") {
      var d = el("div", "logo-fallback", img.getAttribute("data-wordmark") || "BILL-EE");
      if (img.className) d.className += " " + img.className;
      img.replaceWith(d);
    }
  }
  [].forEach.call(document.querySelectorAll("img[data-fallback]"), function (img) {
    if (img.complete && img.naturalWidth === 0) applyFallback(img);
    else img.addEventListener("error", function () { applyFallback(img); }, { once: true });
  });

  /* ---------- Links from config ---------- */
  [].forEach.call(document.querySelectorAll("[data-link]"), function (a) {
    var href = links[a.getAttribute("data-link")];
    if (href && href !== "#") a.setAttribute("href", href);
    else a.hidden = true;
  });

  /* ---------- Hero background photo (optional) ---------- */
  if (cfg.heroBackground) {
    var hb = new Image();
    hb.onload = function () {
      $("heroBg").style.backgroundImage =
        "linear-gradient(180deg, rgba(12,8,20,.78), rgba(60,24,28,.55) 60%, rgba(30,14,18,.8)), url('" + cfg.heroBackground + "')";
    };
    hb.src = cfg.heroBackground;
  }

  /* ---------- Top bar, progress bar, parallax ---------- */
  var topbar = $("topbar"), progress = $("scrollProgress");
  var marsFar = document.querySelector(".mars-far"), marsNear = document.querySelector(".mars-near");
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    topbar.classList.toggle("scrolled", y > 40);
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
    if (!reduce && y < window.innerHeight * 1.2) {
      if (marsFar) marsFar.style.transform = "translate3d(0," + (y * 0.08).toFixed(1) + "px,0)";
      if (marsNear) marsNear.style.transform = "translate3d(0," + (y * 0.16).toFixed(1) + "px,0)";
    }
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = $("navToggle"), list = $("navList");
  function closeMenu() { list.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  toggle.addEventListener("click", function () {
    var open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  list.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Highlight the current menu link ---------- */
  var navLinks = [].slice.call(list.querySelectorAll("a"));
  var navMap = {};
  navLinks.forEach(function (a) { navMap[a.getAttribute("href")] = a; });

  /* side rail + mission readout (desktop) */
  var rail = $("rail"), hudSec = $("hudSec"), railLinks = {};
  navLinks.forEach(function (a) {
    var rid = (a.getAttribute("href") || "").slice(1);
    if (!rid || !rail) return;
    var r = el("a"); r.href = "#" + rid; r.setAttribute("aria-label", a.textContent);
    r.appendChild(document.createElement("i")); r.appendChild(el("span", "", a.textContent));
    rail.appendChild(r); railLinks[rid] = r;
  });
  function setSection(sid) {
    navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + sid); });
    Object.keys(railLinks).forEach(function (k) { railLinks[k].classList.toggle("active", k === sid); });
    if (navMap["#" + sid] && hudSec) hudSec.textContent = navMap["#" + sid].textContent.toUpperCase();
  }
  setSection("home");

  if ("IntersectionObserver" in window) {
    var navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && navMap["#" + en.target.id]) setSection(en.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "rover", "team", "urc", "gallery", "resources", "contact"].forEach(function (id) {
      var s = $(id); if (s) navIO.observe(s);
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduce) {
    var revIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); revIO.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (r) { revIO.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add("in"); });
  }

  /* ---------- Star field (home section) ---------- */
  (function stars() {
    var c = $("stars"); if (!c || !c.getContext) return;
    var ctx = c.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, S = [], shoot = null, running = false, raf = 0, nextShoot = 0;
    function size() {
      W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.round(Math.min(220, W * H / 7000));
      S = [];
      for (var i = 0; i < count; i++) {
        S.push({ x: Math.random() * W, y: Math.random() * H * 0.85, r: Math.random() * 1.3 + 0.25, p: Math.random() * 6.28, s: Math.random() * 0.02 + 0.006, v: Math.random() * 0.06 + 0.01 });
      }
      draw(0);
    }
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < S.length; i++) {
        var s = S[i];
        var a = 0.35 + 0.65 * Math.abs(Math.sin(s.p + t * s.s));
        ctx.globalAlpha = a * (1 - s.y / (H * 1.1));
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
        if (!reduce) { s.x += s.v; if (s.x > W + 2) s.x = -2; }
      }
      if (shoot) {
        ctx.globalAlpha = Math.max(0, shoot.life);
        var g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.dx * 14, shoot.y - shoot.dy * 14);
        g.addColorStop(0, "rgba(255,230,170,1)"); g.addColorStop(1, "rgba(255,230,170,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.dx * 14, shoot.y - shoot.dy * 14); ctx.stroke();
        shoot.x += shoot.dx; shoot.y += shoot.dy; shoot.life -= 0.014;
        if (shoot.life <= 0) shoot = null;
      } else if (t > nextShoot && !reduce) {
        shoot = { x: Math.random() * W * 0.7 + W * 0.2, y: Math.random() * H * 0.25, dx: 9 + Math.random() * 4, dy: 3.5 + Math.random() * 2, life: 1 };
        nextShoot = t + 7000 + Math.random() * 8000;
      }
      ctx.globalAlpha = 1;
    }
    function loop(t) { if (!running) return; draw(t); raf = requestAnimationFrame(loop); }
    size();
    window.addEventListener("resize", size);
    if (!reduce && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        running = en[0].isIntersecting;
        cancelAnimationFrame(raf);
        if (running) raf = requestAnimationFrame(loop);
      }).observe(c);
    }
  })();

  /* ============================================================
     ROVER VIEWER
     Each video starts exploded and assembles. It plays once when it
     scrolls into view, holds on the assembled rover, and the slider
     lets visitors scrub between exploded and assembled.
     ============================================================ */
  var roverApi = null;

  function buildRoverViewer(views) {
    var root = $("roverViewer");
    if (!root || !views.length) return null;
    var n = views.length, cur = 0;
    var speed = +cfg.roverSpeed > 0 ? +cfg.roverSpeed : 0.6;
    var userPaused = reduce, inView = false, raf = 0, scrubTarget = null;
    var missionNames = {};
    (cfg.urcMissions || []).forEach(function (m) { missionNames[m.id] = m.name.replace(/ Mission$/, ""); });

    root.innerHTML = "";

    /* tabs */
    var tabs = el("div", "rv-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Choose a rover system");

    /* stage */
    var stage = el("div", "rv-stage");
    var slidesEl = el("div", "rv-slides");
    var status = el("div", "rv-status");
    status.setAttribute("aria-live", "off");
    var prev = el("button", "rv-arrow rv-prev"); prev.type = "button"; prev.setAttribute("aria-label", "Previous system"); prev.innerHTML = ICONS.prev;
    var next = el("button", "rv-arrow rv-next"); next.type = "button"; next.setAttribute("aria-label", "Next system"); next.innerHTML = ICONS.next;

    var tabBtns = [], vids = [], slideEls = [];
    views.forEach(function (v, k) {
      var slide = el("div", "rv-slide");
      var vd = document.createElement("video");
      vd.muted = true; vd.defaultMuted = true; vd.playsInline = true; vd.loop = false;
      vd.setAttribute("muted", ""); vd.setAttribute("playsinline", ""); vd.setAttribute("webkit-playsinline", "");
      vd.preload = "auto";
      if (v.poster) vd.poster = v.poster;
      vd.setAttribute("aria-label", (v.title || "Rover") + " assembly video");
      vd.disablePictureInPicture = true;
      vd.addEventListener("error", function () {
        /* if the in-memory copy was refused, fall back to loading the file directly once */
        if (/^blob:/.test(vd.currentSrc || vd.src || "") && !vd._retried) { vd._retried = true; vd.src = v.video; return; }
        slide.classList.add("missing");
        slide.innerHTML = "";
        slide.appendChild(el("p", "rv-missing", "Add " + v.video));
      });
      vd.addEventListener("loadedmetadata", function () {
        if (k !== cur) return;
        paint();
        if (inView && !userPaused && vd.paused && !vd.ended && progress() < 0.01) play(false);
      });
      vd.addEventListener("ended", function () { if (k === cur) paint(); });
      vd.addEventListener("play", function () { if (k === cur) { startTick(); paint(); } });
      vd.addEventListener("pause", function () { if (k === cur) paint(); });
      slide.appendChild(vd);
      slidesEl.appendChild(slide);
      vids.push(vd); slideEls.push(slide);

      var t = el("button", "rv-tab"); t.type = "button";
      t.setAttribute("role", "tab");
      t.appendChild(el("small", "", "0" + (k + 1)));
      t.appendChild(el("span", "", v.title || ("View " + (k + 1))));
      t.addEventListener("click", function () { go(k); });
      tabs.appendChild(t); tabBtns.push(t);
    });

    /* Load each video fully into memory (a blob) so the slider can jump anywhere, on any host. */
    var srcState = [];
    function ensureSrc(k) {
      if (k < 0 || k >= n || srcState[k]) return;
      srcState[k] = 1;
      var url = views[k].video, vd = vids[k];
      if (window.fetch && window.URL && URL.createObjectURL && location.protocol !== "file:") {
        fetch(url).then(function (r) { if (!r.ok) throw new Error("bad response"); return r.blob(); })
          .then(function (b) {
            vd.src = URL.createObjectURL(b.type ? b : new Blob([b], { type: "video/mp4" }));
          })
          .catch(function () { vd.src = url; });
      } else {
        vd.src = url;
      }
    }

    stage.appendChild(slidesEl);
    stage.appendChild(prev); stage.appendChild(next);
    stage.appendChild(status);

    /* readout overlay: corner brackets, system name, live assembly percent */
    var hud = el("div", "rv-hud"); hud.setAttribute("aria-hidden", "true");
    ["tl", "tr", "bl", "br"].forEach(function (c) { hud.appendChild(el("i", "c " + c)); });
    var hudL = el("span", "lbl l"), hudR = el("span", "lbl r");
    hud.appendChild(hudL); hud.appendChild(hudR);
    var hint = el("p", "rv-hint", "Drag to take it apart"); hint.setAttribute("aria-hidden", "true");
    stage.appendChild(hud); stage.appendChild(hint);

    /* controls */
    var bar = el("div", "rv-bar");
    var playBtn = el("button", "rv-play"); playBtn.type = "button";
    var scrub = el("div", "rv-scrub");
    var lblA = el("span", "", "Exploded");
    var range = el("input", "rv-range");
    range.type = "range"; range.min = "0"; range.max = "1000"; range.step = "1"; range.value = "0";
    range.setAttribute("aria-label", "Assembly progress, from exploded to assembled");
    var lblB = el("span", "", "Assembled");
    scrub.appendChild(lblA); scrub.appendChild(range); scrub.appendChild(lblB);
    bar.appendChild(playBtn); bar.appendChild(scrub);

    /* info */
    var info = el("div", "rv-info");
    var infoMain = el("div", "rv-info-main");
    var infoTitle = el("h3", "serif");
    var infoBlurb = el("p");
    infoMain.appendChild(infoTitle); infoMain.appendChild(infoBlurb);
    var infoSide = el("div", "rv-info-side");
    info.appendChild(infoMain); info.appendChild(infoSide);

    root.appendChild(tabs); root.appendChild(stage); root.appendChild(bar); root.appendChild(info);

    /* ---- helpers ---- */
    function vid() { return vids[cur]; }
    function dur(v) { return isFinite(v.duration) && v.duration > 0 ? v.duration : 0; }
    function progress() {
      var v = vid(), d = dur(v);
      return d ? Math.min(1, v.currentTime / d) : 0;
    }
    function paint() {
      var v = vid(), p = progress();
      var finished = v.ended || p > 0.995;
      range.value = String(Math.round(p * 1000));
      range.style.setProperty("--p", (p * 100).toFixed(1) + "%");
      var label, icon;
      if (finished) { label = "Replay"; icon = ICONS.replay; }
      else if (v.paused) { label = p < 0.01 ? "Play" : "Resume"; icon = ICONS.play; }
      else { label = "Pause"; icon = ICONS.pause; }
      playBtn.innerHTML = icon + "<span>" + label + "</span>";
      playBtn.setAttribute("aria-label", label + " assembly");
      status.textContent = p < 0.02 ? "Exploded" : (finished ? "Assembled" : "Assembling " + Math.round(p * 100) + "%");
      status.classList.toggle("done", finished);
      hudR.textContent = "ASSEMBLY " + (p < 0.02 ? 0 : Math.round(p * 100)) + "%";
    }
    function tick() {
      raf = 0;
      if (scrubTarget !== null) {
        var d = dur(vid());
        if (d) vid().currentTime = scrubTarget * d;
        scrubTarget = null;
      }
      paint();
      if (!vid().paused && !vid().ended) raf = requestAnimationFrame(tick);
    }
    function startTick() { if (!raf) raf = requestAnimationFrame(tick); }

    function play(fromStart) {
      var v = vid();
      if (v.ended || progress() > 0.995 || fromStart) { try { v.currentTime = 0; } catch (e) {} }
      v.playbackRate = speed;
      var pr = v.play();
      if (pr && pr.catch) pr.catch(function () { paint(); });
      userPaused = false;
      startTick();
    }
    function pause() { vid().pause(); }

    function go(k, opts) {
      k = Math.max(0, Math.min(n - 1, k));
      var changed = k !== cur;
      if (changed) pause();
      var from = cur;
      cur = k;
      ensureSrc(k); ensureSrc(k + 1);
      slideEls.forEach(function (s, j) {
        s.classList.toggle("is-active", j === k);
        s.classList.toggle("is-prev", j < k);
        s.classList.toggle("is-next", j > k);
      });
      tabBtns.forEach(function (t, j) { t.setAttribute("aria-selected", j === k ? "true" : "false"); });
      prev.disabled = k === 0; next.disabled = k === n - 1;
      if (changed) {
        var v = vids[k];
        try { v.currentTime = 0; } catch (e) {}
        userPaused = reduce;
      }
      /* info panel */
      var view = views[k];
      hudL.textContent = "SYS 0" + (k + 1) + " / 0" + n + "  ·  " + (view.title || "").toUpperCase();
      infoTitle.textContent = view.title || "";
      infoBlurb.textContent = view.blurb || "";
      infoSide.innerHTML = "";
      var chips = view.missions || [];
      if (chips.length) {
        infoSide.appendChild(el("p", "rv-label", "URC missions"));
        var row = el("div", "rv-chips");
        chips.forEach(function (id) {
          var a = el("a", "rv-chip", missionNames[id] || id);
          a.href = "#mission-" + id;
          row.appendChild(a);
        });
        infoSide.appendChild(row);
      }
      if ((view.facts || []).length) {
        var ul = el("ul", "rv-facts");
        view.facts.forEach(function (f) { ul.appendChild(el("li", "", f)); });
        infoSide.appendChild(ul);
      }
      info.classList.remove("swap"); void info.offsetWidth; info.classList.add("swap");
      paint();
      if (changed && inView && !userPaused && !(opts && opts.noPlay)) play(true);
      return from !== k;
    }

    /* ---- events ---- */
    prev.addEventListener("click", function () { go(cur - 1); });
    next.addEventListener("click", function () { go(cur + 1); });
    playBtn.addEventListener("click", function () {
      var v = vid();
      if (v.ended || progress() > 0.995) play(true);
      else if (v.paused) play(false);
      else { userPaused = true; pause(); }
    });
    range.addEventListener("input", function () {
      userPaused = true;
      pause();
      scrubTarget = (+range.value) / 1000;
      range.style.setProperty("--p", (scrubTarget * 100).toFixed(1) + "%");
      if (!raf) raf = requestAnimationFrame(tick);
    });
    root.addEventListener("keydown", function (e) {
      if (e.target === range) return;
      if (e.key === "ArrowLeft") { go(cur - 1); e.preventDefault(); }
      else if (e.key === "ArrowRight") { go(cur + 1); e.preventDefault(); }
    });

    /* mouse: drag across the model to scrub between exploded and assembled */
    var drag = null;
    stage.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0 || (e.target.closest && e.target.closest(".rv-arrow"))) return;
      drag = { x: e.clientX, p: progress(), w: stage.clientWidth || 1, moved: false };
      if (stage.setPointerCapture) { try { stage.setPointerCapture(e.pointerId); } catch (err) {} }
    });
    stage.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var dx = e.clientX - drag.x;
      if (!drag.moved) {
        if (Math.abs(dx) < 4) return;
        drag.moved = true; userPaused = true; pause();
        stage.classList.add("dragging"); hint.classList.add("gone");
      }
      scrubTarget = Math.max(0, Math.min(1, drag.p + dx / (drag.w * 0.8)));
      if (!raf) raf = requestAnimationFrame(tick);
    });
    function endDrag() { if (!drag) return; drag = null; stage.classList.remove("dragging"); }
    stage.addEventListener("pointerup", endDrag);
    stage.addEventListener("pointercancel", endDrag);

    /* swipe */
    var sx = null, sy = null;
    stage.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1));
      sx = null;
    }, { passive: true });

    /* start when it scrolls into view, pause when it leaves */
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          inView = en.isIntersecting;
          var v = vid();
          if (inView) {
            if (!userPaused && v.paused && !v.ended && progress() < 0.995) play(false);
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { threshold: 0.45 }).observe(stage);
      /* warm up all videos shortly before the section is reached */
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) vids.forEach(function (v, k) { ensureSrc(k); });
      }, { rootMargin: "900px 0px" }).observe(root);
    } else {
      inView = true;
    }

    go(0, { noPlay: true });
    return { go: go, count: n };
  }

  var views = (cfg.roverViews || []).filter(function (v) { return v && v.video; });
  roverApi = buildRoverViewer(views);

  /* ---------- Team leads ---------- */
  (function leads() {
    var grid = $("leadGrid"); if (!grid) return;
    (cfg.leads || []).forEach(function (l, i) {
      var card = el("article", "lead-card reveal");
      var ph = el("div", "lead-photo");
      var initials = (l.name || "?").split(/\s+/).map(function (w) { return w.charAt(0); }).slice(0, 2).join("").toUpperCase();
      ph.appendChild(el("span", "ini", initials));
      if (l.photo) {
        var im = new Image(); im.src = l.photo; im.alt = "Photo of " + (l.name || "team lead"); im.loading = "lazy"; im.decoding = "async";
        im.addEventListener("error", function () { im.remove(); });
        ph.appendChild(im);
      }
      card.appendChild(ph);
      card.appendChild(el("p", "lead-team", l.team || ""));
      card.appendChild(el("h4", "", l.name || ""));
      card.appendChild(el("p", "lead-role", (l.team || "") + " lead"));
      if (l.blurb) card.appendChild(el("p", "lead-blurb", l.blurb));
      if ((l.tags || []).length) {
        var tg = el("ul", "lead-tags");
        l.tags.forEach(function (t) { tg.appendChild(el("li", "", t)); });
        card.appendChild(tg);
      }
      grid.appendChild(card);
      if (!("IntersectionObserver" in window) || reduce) card.classList.add("in");
      else revIO.observe(card);
    });
  })();

  /* ---------- URC missions ---------- */
  (function missions() {
    var grid = $("missionGrid"); if (!grid) return;
    (cfg.urcMissions || []).forEach(function (m, i) {
      var card = el("article", "mission reveal");
      card.id = "mission-" + m.id;
      card.appendChild(el("p", "mission-tag", "Mission " + (i + 1)));
      card.appendChild(el("h4", "serif", m.name));
      card.appendChild(el("p", "", m.text));
      if (typeof m.view === "number" && roverApi && m.view < roverApi.count) {
        var a = el("a", "mission-link");
        a.href = "#rover";
        a.innerHTML = "<span>" + (m.viewLabel || "See it on the rover") + "</span>" + ICONS.arrow;
        a.addEventListener("click", function () { roverApi.go(m.view); });
        card.appendChild(a);
      }
      grid.appendChild(card);
      if (!("IntersectionObserver" in window) || reduce) card.classList.add("in");
      else revIO.observe(card);
    });
  })();

  /* ---------- URC photo (with a built-in fallback so it is never empty) ---------- */
  (function urcPhoto() {
    var img = $("urcPhoto"), cap = $("urcCap"), p = cfg.urcPhoto || {};
    if (!img) return;
    if (p.fallback) img.src = p.fallback;
    if (!p.src) return;
    var probe = new Image();
    probe.onload = function () {
      img.src = p.src;
      img.alt = p.alt || "A rover at the University Rover Challenge";
      img.classList.remove("missing");
      if (cap && p.credit) {
        cap.textContent = "";
        if (p.creditHref) {
          var a = el("a", "", p.credit); a.href = p.creditHref; a.target = "_blank"; a.rel = "noopener";
          cap.appendChild(a);
        } else cap.textContent = p.credit;
      }
    };
    probe.onerror = function () { if (cap) cap.textContent = "Illustration: a rover on Mars"; };
    probe.src = p.src;
  })();

  /* ---------- SAR video (YouTube click-to-play, or a video file) ---------- */
  (function urcVideo() {
    var box = $("urcVideo"); if (!box) return;
    var u = cfg.urcVideo || {};
    var title = u.title || "URC video";
    var sarBtn = $("heroSar");
    if (u.caption && $("sarCap")) $("sarCap").textContent = u.caption;
    var yt = (u.youtube || "").trim();
    var m = yt && (yt.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/) || yt.match(/^([\w-]{11})$/));
    if (m) {
      var id = m[1];
      if (sarBtn) sarBtn.hidden = false;
      box.innerHTML = ""; box.classList.add("filled", "is-link");
      var b = el("a", "vf-poster");
      b.href = "https://www.youtube.com/watch?v=" + id; b.target = "_blank"; b.rel = "noopener";
      b.setAttribute("aria-label", "Watch " + title + " on YouTube (opens in a new tab)");
      var pl = el("span", "vf-play");
      pl.innerHTML = '<svg viewBox="0 0 24 24" width="38" height="38" fill="currentColor" aria-hidden="true"><path d="M8 4.5v15l12-7.5z"/></svg>';
      b.appendChild(pl);
      var meta = el("span", "vf-meta");
      meta.appendChild(el("small", "", "System Acceptance Review"));
      meta.appendChild(el("b", "", title));
      var go = el("span", "vf-go"); go.innerHTML = "<span>Watch on YouTube</span>" + ICONS.arrow;
      meta.appendChild(go);
      b.appendChild(meta);
      box.appendChild(b);
      return;
    }
    if (u.file) {
      if (sarBtn) sarBtn.hidden = false;
      box.innerHTML = "";
      var v = document.createElement("video");
      v.controls = true; v.playsInline = true; v.preload = "metadata";
      if (u.poster) v.poster = u.poster;
      v.src = u.file;
      v.addEventListener("error", function () { box.classList.remove("filled"); box.innerHTML = '<div class="vf-empty"><strong>Video not found</strong><small>Check the file name in <code>site-config.js</code></small></div>'; });
      box.appendChild(v); box.classList.add("filled");
    }
  })();

  /* ---------- Team Moment: moving background ---------- */
  (function momentsBg() {
    var bg = cfg.teamBackground || {}, host = $("momentsBg");
    if (!host) return;
    if (bg.src) {
      if (bg.type === "video") {
        var bv = document.createElement("video");
        bv.autoplay = true; bv.loop = true; bv.muted = true; bv.playsInline = true;
        bv.setAttribute("muted", ""); bv.setAttribute("playsinline", "");
        bv.src = bg.src;
        bv.addEventListener("error", function () { bv.remove(); });
        host.appendChild(bv);
      } else {
        var probe = new Image();
        probe.onload = function () { host.style.backgroundImage = "url('" + bg.src + "')"; if (!reduce) host.classList.add("pan"); };
        probe.src = bg.src;
      }
    }
    if (typeof bg.darken === "number") $("momentsShade").style.opacity = bg.darken;
  })();

  /* ---------- Team Moment: collage + photo viewer ---------- */
  (function collage() {
    var grid = $("collage"); if (!grid) return;
    var items = cfg.collage || [];
    var lb = $("lightbox"), lbImg = $("lbImg"), lbCap = $("lbCap");
    var li = 0, lastFocus = null;

    function show(i) {
      li = (i + items.length) % items.length;
      lbImg.src = items[li].src;
      lbImg.alt = items[li].alt || "";
      lbCap.textContent = items[li].caption || items[li].alt || "";
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.hidden = false;
      document.body.classList.add("no-scroll");
      $("lbClose").focus();
    }
    function close() {
      lb.hidden = true;
      document.body.classList.remove("no-scroll");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    $("lbClose").addEventListener("click", close);
    $("lbPrev").addEventListener("click", function () { show(li - 1); });
    $("lbNext").addEventListener("click", function () { show(li + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(li - 1);
      else if (e.key === "ArrowRight") show(li + 1);
    });

    items.forEach(function (it, i) {
      var b = el("button", "shot reveal");
      b.type = "button";
      b.setAttribute("aria-label", "Open photo: " + (it.caption || it.alt || "photo " + (i + 1)));
      var im = new Image();
      im.src = it.src; im.alt = it.alt || ""; im.loading = "lazy"; im.decoding = "async";
      im.addEventListener("error", function () {
        b.classList.add("missing"); im.remove();
        b.appendChild(el("span", "", "Add " + it.src));
      });
      b.appendChild(im);
      if (it.caption) b.appendChild(el("span", "shot-cap", it.caption));
      b.addEventListener("click", function () { open(i); });
      grid.appendChild(b);
      if (!("IntersectionObserver" in window) || reduce) b.classList.add("in");
      else revIO.observe(b);
    });
  })();

  /* ---------- Resources ---------- */
  (function resources() {
    var grid = $("resGrid"); if (!grid) return;
    (cfg.resources || []).forEach(function (r) {
      if (!r.href) return;
      var a = el("a", "res reveal");
      a.href = r.href; a.target = "_blank"; a.rel = "noopener";
      var ic = el("span", "res-icon"); ic.innerHTML = ICONS[r.type] || ICONS.arrow;
      a.appendChild(ic);
      a.appendChild(el("p", "res-label", r.label || ""));
      a.appendChild(el("h3", "serif", r.title || ""));
      if (r.name) a.appendChild(el("p", "res-name", r.name));
      if (r.text) a.appendChild(el("p", "res-text", r.text));
      var cta = el("span", "res-cta"); cta.innerHTML = "<span>" + (r.cta || "Open") + "</span>" + ICONS.arrow;
      a.appendChild(cta);
      grid.appendChild(a);
      if (!("IntersectionObserver" in window) || reduce) a.classList.add("in");
      else revIO.observe(a);
    });
  })();
  /* ============================================================
     EXTRA POLISH: ticker, readout clock, pointer effects, text decode
     ============================================================ */

  /* ---------- Ticker band ---------- */
  (function ticker() {
    var track = $("tkTrack"); if (!track) return;
    var words = (cfg.urcMissions || []).map(function (m) { return m.name; });
    words.unshift("BILL-EE");
    words.push("Cal Poly Pomona", "Bronco STAR", "University Rover Challenge");
    for (var g = 0; g < 3; g++) {
      var grp = el("div", "tk-group");
      words.forEach(function (w) { var s = el("span", "tk-item", w); s.appendChild(document.createElement("i")); grp.appendChild(s); });
      track.appendChild(grp);
    }
  })();

  /* ---------- Mission clock in the readout ---------- */
  (function clock() {
    var c = $("hudClock"); if (!c) return;
    var t0 = Date.now();
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    setInterval(function () {
      var s = Math.floor((Date.now() - t0) / 1000);
      c.textContent = pad(Math.floor(s / 3600)) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60);
    }, 1000);
  })();

  /* ---------- Staggered reveal + card effects ---------- */
  ["leadGrid", "missionGrid", "resGrid", "collage"].forEach(function (gid) {
    var g = $(gid); if (!g) return;
    [].forEach.call(g.children, function (c, i) { c.style.setProperty("--d", (i % 6) * 70 + "ms"); });
  });
  [].forEach.call(document.querySelectorAll(".info-card, .follow-card, .lead-card, .mission, .res"), function (c) { c.classList.add("fx"); });
  [].forEach.call(document.querySelectorAll(".lead-card, .mission, .res"), function (c) { c.classList.add("tiltable"); });

  /* ---------- Pointer effects (mouse devices only) ---------- */
  (function pointerFx() {
    if (reduce || !window.matchMedia || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var hero = $("home"), raf = 0, last = null;
    function frame() {
      raf = 0; if (!last || !hero) return;
      var r = hero.getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= window.innerHeight) return;
      var nx = (last.clientX - r.left) / r.width, ny = (last.clientY - r.top) / r.height;
      hero.style.setProperty("--px", ((nx - 0.5) * 2).toFixed(3));
      hero.style.setProperty("--py", ((ny - 0.5) * 2).toFixed(3));
      hero.style.setProperty("--gx", (nx * 100).toFixed(1) + "%");
      hero.style.setProperty("--gy", (ny * 100).toFixed(1) + "%");
    }
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      last = e; if (!raf) raf = requestAnimationFrame(frame);
      var c = e.target.closest ? e.target.closest(".fx") : null;
      if (!c) return;
      var b = c.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
      c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
      if (c.classList.contains("tiltable") && c.classList.contains("in")) {
        c.classList.add("tilt");
        c.style.setProperty("--ry", ((x / b.width - 0.5) * 9).toFixed(2) + "deg");
        c.style.setProperty("--rx", ((0.5 - y / b.height) * 7).toFixed(2) + "deg");
        c.style.setProperty("--ty", "-6px");
      }
    }, { passive: true });
    document.addEventListener("pointerout", function (e) {
      var c = e.target.closest ? e.target.closest(".tiltable") : null;
      if (c && !c.contains(e.relatedTarget)) {
        c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); c.style.setProperty("--ty", "0px");
      }
    });
    /* buttons lean toward the pointer */
    [].forEach.call(document.querySelectorAll(".btn"), function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.translate = ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + "px " + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px";
      });
      b.addEventListener("pointerleave", function () { b.style.translate = ""; });
    });
  })();

  /* ---------- Section labels "decode" when they scroll into view ---------- */
  (function decode() {
    if (reduce || !("IntersectionObserver" in window)) return;
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#";
    function run(node, finalText) {
      var t0 = 0, dur = 650 + finalText.length * 14;
      function step(t) {
        if (!t0) t0 = t;
        var k = Math.min(1, (t - t0) / dur), out = "";
        for (var i = 0; i < finalText.length; i++) {
          var ch = finalText.charAt(i);
          out += (!/[A-Za-z0-9]/.test(ch) || i < k * finalText.length) ? ch : chars.charAt(Math.floor(Math.random() * chars.length));
        }
        node.nodeValue = out;
        if (k < 1) requestAnimationFrame(step); else node.nodeValue = finalText;
      }
      requestAnimationFrame(step);
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var node = null;
        [].forEach.call(en.target.childNodes, function (n) { if (n.nodeType === 3 && n.nodeValue.trim()) node = n; });
        if (node) run(node, node.nodeValue);
      });
    }, { threshold: 0.9 });
    [].forEach.call(document.querySelectorAll(".eyebrow"), function (e) { io.observe(e); });
  })();

})();
