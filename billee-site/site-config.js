/* ==========================================================
   SITE CONFIG: the easy place to change links, videos, photos
   and names. Put files in the /assets folder, then change the
   file names or text below. Save, commit, and Vercel updates.
   Keep the quotes and the commas at the end of each line.
   ========================================================== */

window.SITE_CONFIG = {

  /* ---------- LINKS ---------- */
  links: {
    instagramBillee: "https://www.instagram.com/cppbilleerover/",     // @cppbilleerover
    instagramBroncoStar: "https://www.instagram.com/broncostar.cpp/", // @broncostar.cpp
    joinForm: "https://docs.google.com/forms/d/e/1FAIpQLScn0ZlG18I9SuRYV-xNwoY9KCyzghy9_hsZ3fKHFrPgNV5k5A/viewform?usp=publish-editor",
    urcWebsite: "https://urc.marssociety.org/",
    disclaimerLearnMore: "", // optional: link for the disclaimer "Learn more" button. Leave "" to hide it.
  },

  /* ---------- HOME ---------- */
  // Optional Mars/desert photo behind the home section. If the file is missing the site shows a gradient.
  heroBackground: "assets/hero-bg.jpg",

  /* ---------- ROVER VIEWER ---------- */
  // Each video starts exploded and assembles. 1 = original speed, 0.5 = half speed.
  roverSpeed: 0.6,

  // The three views (click the arrows to go through them). Add, remove or reorder freely.
  // missions = which URC missions the system is for (ids come from urcMissions below).
  roverViews: [
    {
      title: "Rover",
      blurb: "The full rover: six-wheel rocker-bogie chassis, body, and mast. It starts pulled apart and comes together as you watch.",
      video: "assets/rover-assemble.mp4",
      poster: "assets/rover-assemble-poster.jpg",
      missions: ["delivery", "autonomy"],
      facts: ["Six-wheel rocker-bogie chassis", "Tall mast"],
    },
    {
      title: "Arm",
      blurb: "The robotic arm, shown part by part as it assembles. It is built for dexterous work, like servicing equipment on a mock lander.",
      video: "assets/arm-assemble.mp4",
      poster: "assets/arm-assemble-poster.jpg",
      missions: ["servicing"],
      facts: [],
    },
    {
      title: "Science Module",
      blurb: "The science module and its drill, assembling from individual parts.",
      video: "assets/science-assemble.mp4",
      poster: "assets/science-assemble-poster.jpg",
      missions: ["astrobiology"],
      facts: [],
    },
  ],

  /* ---------- TEAM LEADS ---------- */
  // Photos live in assets/leads/. To change one, replace the file with the same name
  // (a square photo, about 400 x 400, works best) or change the file name here.
  leads: [
    {
      team: "Mechanical",
      name: "Adrian Poitras",
      photo: "assets/leads/adrian-poitras.jpg",
      blurb: "Leads the mechanical team, which designs and builds the rover's structure: the chassis, wheels and suspension, and the mounts that hold every other system.",
      tags: ["CAD", "Chassis", "Manufacturing"],
    },
    {
      team: "Operations",
      name: "Caitlyn Alba",
      photo: "assets/leads/caitlyn-alba.jpg",
      blurb: "Leads operations: planning, scheduling, and the coordination that keeps every subteam building toward the same competition goals.",
      tags: ["Planning", "Coordination", "Logistics"],
    },
    {
      team: "Science",
      name: "Joshua Dang",
      photo: "assets/leads/joshua-dang.jpg",
      blurb: "Leads the science team, which builds the science module and its drill for the astrobiology mission: collecting and analyzing samples in the field.",
      tags: ["Science module", "Drill", "Sampling"],
    },
    {
      team: "Hardware + Software",
      name: "Luca Lanzillotta",
      photo: "assets/leads/luca-lanzillotta.jpg",
      blurb: "Leads hardware and software: the electronics and wiring inside the rover and the code that drives it, from remote operation to autonomy.",
      tags: ["Electronics", "Embedded code", "Autonomy"],
    },
  ],

  /* ---------- UNIVERSITY ROVER CHALLENGE ---------- */
  // The four missions. "view" is the rover viewer slide it links to (0 = Rover, 1 = Arm, 2 = Science Module).
  urcMissions: [
    {
      id: "astrobiology",
      name: "Astrobiology Mission",
      text: "Investigate field sites for evidence of life, analyze samples onboard, and return a sealed sample cache.",
      view: 2,
      viewLabel: "See the science module",
    },
    {
      id: "delivery",
      name: "Delivery Mission",
      text: "Find, handle, transport, and deliver objects to simulated astronauts across difficult terrain.",
      view: 0,
      viewLabel: "See the rover",
    },
    {
      id: "servicing",
      name: "Equipment Servicing Mission",
      text: "Use a robotic arm and related systems to perform dexterous tasks on a mock lander.",
      view: 1,
      viewLabel: "See the arm",
    },
    {
      id: "autonomy",
      name: "Autonomy Mission",
      text: "Autonomously assist an astronaut and autonomously find routes through a hilly area.",
      view: 0,
      viewLabel: "See the rover",
    },
  ],

  // The photo beside "What is URC?".
  //   src:      the photo. It is loaded from Wikimedia Commons (a free image library).
  //             To use your own instead, put a photo in assets (for example assets/urc-photo.jpg) and set src to that.
  //             Other Commons photos you can try by swapping the file name at the end of the link:
  //             Mars_Society_University_Rover_Challenge_Hill_Climb.jpg, ..._Rock_Garden.jpg,
  //             ..._Soil_Sample_Caching.jpg, Mars_Society_University_Rover_Challenge_2017.jpg
  //   fallback: shown only if the photo cannot load (an illustration, so the section never looks empty)
  //   credit:   the line under the photo. creditHref is where it links. Both are hidden if the fallback is used.
  urcPhoto: {
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Mars_Society_University_Rover_Challenge_Equipment_Task.jpg?width=1400",
    fallback: "assets/urc-scene.jpg",
    alt: "A rover at the University Rover Challenge in the Utah desert",
    credit: "Photo: University Rover Challenge, via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Mars_Society_University_Rover_Challenge_Equipment_Task.jpg",
  },

  // The SAR (System Acceptance Review) video. Fill in ONE of file or youtube.
  //   youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX"   (shows a card that opens the video on YouTube in a new tab)
  //   file:    "assets/urc-video.mp4"   (plays right on the page; upload the file to assets, keep it under 25 MB)
  urcVideo: {
    youtube: "https://www.youtube.com/watch?v=xsm0fc5Iomc",
    file: "",
    poster: "", // optional still image for a file video, e.g. "assets/urc-video-poster.jpg"
    title: "BILL-EE URC SAR 2026",
    caption: "Our 2026 System Acceptance Review video for the University Rover Challenge, hosted by the Mars Society.",
  },

  /* ---------- RESOURCES ---------- */
  // type: "github" or "slides" (picks the icon). Add, remove or reorder freely.
  resources: [
    {
      type: "github",
      label: "GitHub",
      title: "Software repository",
      name: "BILLEE_software_2026",
      text: "Code for controlling the rover, its sensors, and autonomy.",
      href: "https://github.com/BILLEE-BroncoSTAR/BILLEE_software_2026",
      cta: "Open on GitHub",
    },
    {
      type: "github",
      label: "GitHub",
      title: "Hardware repository",
      name: "billee-hardware-2027",
      text: "Hardware documentation for the electronics inside the rover.",
      href: "https://github.com/BILLEE-BroncoSTAR/billee-hardware-2027",
      cta: "Open on GitHub",
    },
    {
      type: "slides",
      label: "Google Slides",
      title: "Team presentation",
      name: "Slide deck",
      text: "An overview of the team and the rover in slides.",
      href: "https://docs.google.com/presentation/d/1Gn1ttvHhQ8mT0pDx2bw4OjPBhogjFKY4-ulJR0aSHrA/edit?slide=id.g349e93be379_0_0#slide=id.g349e93be379_0_0",
      cta: "Open the slides",
    },
  ],

  /* ---------- TEAM MOMENT (photo collage) ---------- */
  // Moving background behind the collage. type: "image" (slow pan and zoom) or "video" (loops).
  // If the file is missing, a dark gradient is shown. darken: 0 = none, 1 = black.
  teamBackground: {
    type: "image",
    src: "assets/team-bg.jpg",
    darken: 0.55,
  },

  // 9 photos make the full collage layout. Each one currently points at a filler image.
  // TO REPLACE A PHOTO: copy your real photo into assets/collage/ with the SAME file name
  // (for example photo-01.jpg). Any size works, it is cropped to fit. About 1600 x 1200 is ideal.
  // Update the alt text (describes the photo) and caption (shows on hover) when you swap one.
  collage: [
    { src: "assets/collage/photo-01.jpg", alt: "The whole team together", caption: "Whole team photo" },
    { src: "assets/collage/photo-02.jpg", alt: "Team members building the rover chassis", caption: "Building the chassis" },
    { src: "assets/collage/photo-03.jpg", alt: "Team members working at the electronics bench", caption: "Electronics bench" },
    { src: "assets/collage/photo-04.jpg", alt: "Team members writing code", caption: "Writing the code" },
    { src: "assets/collage/photo-05.jpg", alt: "The rover being tested outdoors", caption: "Field testing" },
    { src: "assets/collage/photo-06.jpg", alt: "Team members in a design review", caption: "Design review" },
    { src: "assets/collage/photo-07.jpg", alt: "The science module and drill being tested", caption: "Science module" },
    { src: "assets/collage/photo-08.jpg", alt: "The team at the competition", caption: "Competition day" },
    { src: "assets/collage/photo-09.jpg", alt: "The team in a planning session", caption: "Planning session" },
  ],
};
