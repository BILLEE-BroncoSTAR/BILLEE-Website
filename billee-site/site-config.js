/* ==========================================================
   SITE CONFIG — the easy place to swap videos and photos.
   Put your files in the /assets folder, then change the
   file names below. No other code needs to change.
   ========================================================== */

window.SITE_CONFIG = {
  // ---------- HOME PAGE ----------
  // Rotating rover video (left side of the home section).
  // Drop your file at assets/rover.mp4 (a .webm also works).
  // Set to "" to show the placeholder box instead.
  roverVideo: "assets/rover-exploded.mp4",
  roverVideoPoster: "assets/rover-exploded-poster.jpg", // optional still frame shown before the video loads

  // Big background behind the logo / home section
  heroBackground: "assets/hero-bg.jpg",

  // ---------- TEAM MOMENT SECTION ----------
  // Moving background. type can be "video" or "image".
  //  - "video": loops silently behind the photos (assets/team-bg.mp4)
  //  - "image": the image slowly pans and zooms (assets/team-bg.jpg)
  teamBackground: {
    type: "image",
    src: "assets/team-bg.jpg",
    // Darkening layer so the photos and title stay readable (0 = none, 1 = black)
    darken: 0.45,
  },

  // The photo grid. Add, remove, or reorder lines freely.
  // Each photo: file in assets/team/, plus alt text (describes the photo).
  teamPhotos: [
    { src: "assets/team/photo-1.jpg", alt: "Team member working at a lab bench" },
    { src: "assets/team/photo-2.jpg", alt: "Two team members building the rover chassis" },
    { src: "assets/team/photo-3.jpg", alt: "Team members assembling a part" },
    { src: "assets/team/photo-4.jpg", alt: "Team planning at a whiteboard" },
    { src: "assets/team/photo-5.jpg", alt: "Team members working on electronics" },
    { src: "assets/team/photo-6.jpg", alt: "Rover with robotic arm outdoors on campus" },
    { src: "assets/team/photo-7.jpg", alt: "Team member at the CNC machine" },
  ],

  // ---------- EMAIL SIGN-UP ----------
  // Free option: create a form at https://formspree.io and paste its URL here
  // (looks like https://formspree.io/f/abcdwxyz). Leave "" to disable.
  signupEndpoint: "",

  // ---------- LINKS (buttons across the site) ----------
  links: {
    joinUs: "#contact",
    ourRover: "#development",
    ourApproaches: "#development",
    documentationDatabase: "#documentation",
    whyUrc: "#challenges",
    urcWebsite: "https://urc.marssociety.org/",
    urcGuidelines: "#", // put a link to your guidelines PDF, e.g. "assets/urc-guidelines.pdf"
    bioRoverLearnMore: "#",
    disclaimerLearnMore: "#",
    instagram: "#",
  },
};
