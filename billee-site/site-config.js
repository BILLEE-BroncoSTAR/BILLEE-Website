/* ==================================================================
   BILL-EE WEBSITE: SITE CONFIG
   ------------------------------------------------------------------
   This is the one file to edit for names, text, photos, and links.
   Change the text between the quotes, keep the commas, save, commit
   to GitHub, and Vercel will update the live site.

   PHOTOS can come from two places:
     1. A file in the assets folder:   "assets/img/my-photo.jpg"
     2. A Google Drive photo:          drive("FILE_ID")
        (FILE_ID is the long code in the Drive link:
         drive.google.com/file/d/FILE_ID/view)
        The Drive file must be shared as "Anyone with the link".

   Anything left as "" (empty) is hidden on the site.
   ================================================================== */

function drive(id, width) {
  return "https://lh3.googleusercontent.com/d/" + id + "=w" + (width || 1600);
}

window.SITE_CONFIG = {

  /* ---------------------------------------------------------------
     LINKS used across the site
     --------------------------------------------------------------- */
  links: {
    email: "billeerobotics@gmail.com",
    interestForm: "https://docs.google.com/forms/d/e/1FAIpQLScn0ZlG18I9SuRYV-xNwoY9KCyzghy9_hsZ3fKHFrPgNV5k5A/viewform",
    instagramBillee: "https://www.instagram.com/cppbilleerover/",
    instagramBroncoStar: "https://www.instagram.com/broncostar.cpp/",
    urcWebsite: "https://urc.marssociety.org/",
    sarVideo2026: "https://www.youtube.com/watch?v=xsm0fc5Iomc",
    disclaimerLearnMore: "",
  },

  // Cal Poly Pomona logo in the footer ("" to hide)
  cppLogo: drive("1bx7u7tEhBfuReO8gdU9FpmBBoMKAYujY", 600),

  /* ---------------------------------------------------------------
     HOME (the first screen)
     --------------------------------------------------------------- */
  hero: {
    // Photo behind the title.
    image: drive("14GFTUrm0rWwUGHnXDplwrpMROf_QGcqy", 2400),

    // SAR 2027 VIDEO: when it is ready, put it here and it becomes the
    // first thing visitors see.
    //   file:    "assets/sar-2027.mp4"  plays silently in the background
    //            on a loop (keep it short and under ~25 MB).
    //   youtube: "https://www.youtube.com/watch?v=XXXXXXXXXXX"  adds a
    //            "Watch the SAR 2027 video" button.
    videoFile: "",
    youtube: "",
    youtubeLabel: "Watch our SAR 2027 video",

    eyebrow: "Cal Poly Pomona  ·  Bronco STAR",
    // Shown in the home screen readout and the footer.
    coordinates: "34.0589° N  117.8211° W",
    place: "Cal Poly Pomona, California",
    // The numbers along the bottom of the home screen.
    stats: [
      { value: "4", label: "URC missions" },
      { value: "3", label: "Main subsystems" },
      { value: "5", label: "Subteams" },
    ],
    title: "BILL-EE",
    tagline: "Cal Poly Pomona's Mars rover team, competing in the University Rover Challenge.",
  },

  /* ---------------------------------------------------------------
     ABOUT BILL-EE
     --------------------------------------------------------------- */
  about: {
    paragraphs: [
      "BILL-EE is an enthusiastic team of undergraduate STEM students from Cal Poly Pomona operating under Bronco STAR, an Instructionally Related Activity (IRA) Organization. Each year, we build a robotic Mars Rover to compete in the University Rover Challenge (URC) and grow students’ technical skills in various STEM fields (engineering, biology, geology, etc.) Our goal is to develop the next generation of Mars rovers while fostering students’ fascination for space robotics. Our team includes individuals from a large variety of disciplines, including engineering, biology, computer science, and business.",
    ],
    // "Our Goal" box under the about text ("" to hide)
    goalTitle: "Our Goal",
    goal: "At BILL-EE, our mission is to guide STEM students through the often-overlooked complexities of initiating and advancing engineering projects across various fields like Biology, Mechanical, Electrical, and Software Engineering. Our goal is to demystify the 'hidden iceberg' of engineering challenges, offering students the knowledge and tools they need to succeed in their STEM endeavors.",
    teamPhoto: "img/team-2026.jpg",
    teamPhotoAlt: "The BILL-EE team with the rover and the Bronco STAR flag in front of a campus building",
  },

  /* ---------------------------------------------------------------
     THE ROVER: 3 main subsystems (tabs)
     video:  the exploded-view video (desktop only, plays once)
     poster: still frame shown before the video loads
     photo:  shown instead of the video on phones
     note:   small line under the video (leave "" for none)
     --------------------------------------------------------------- */
  roverSpeed: 0.6, // 1 = normal speed, 0.5 = half speed
  // Label shown on every exploded-view video
  explodedLabel: "Exploded view · 2024 rover model",

  subsystems: [
    {
      tab: "Suspension & Chassis",
      title: "Suspension & Chassis",
      video: "assets/rover-assemble.mp4",
      poster: "assets/rover-assemble-poster.jpg",
      photo: drive("1Hreyd1vK6uZbs7_x_3jDTThXFlH3hQUv"),
      note: "",
      paragraphs: [
        "The rover base is a rocker-bogie suspension with six-wheel drive. It carried over from last season with only minor changes, since it had already proven reliable, which let the team put its time into the arm and science systems.",
        "The bogie positions were set to keep the center of gravity low with the robotic arm mounted, so the rover stays stable even with the arm fully extended. The chassis is made of Aluminum Composite Material (ACM) panels on an aluminum T-slot frame, which makes it easy to mount new modules.",
      ],
      specs: [
        "Rocker-bogie suspension, six-wheel drive",
        "Each wheel driven by a NEO brushless motor and its own ODESC controller",
        "ACM panels on an aluminum T-slot frame",
        "Tested over rocks, plants, logs, and curbs",
      ],
      missions: ["Delivery", "Autonomy"],
    },
    {
      tab: "Robotic Arm",
      title: "Robotic Arm",
      video: "assets/arm-assemble.mp4",
      poster: "assets/arm-assemble-poster.jpg",
      photo: drive("1lYWRYY2zDn3LJm6oR-o65BExkiJMs-kC"),
      note: "",
      paragraphs: [
        "The arm was redesigned from the ground up for 2026, except for the first axis drive. It has five degrees of freedom and was designed around strength, weight, and dexterity. Carbon fiber replaced last year's aluminum structure, and the mounts are printed in carbon-fiber-filled PPA.",
        "The wrist uses a differential gearbox with custom 3D-printed helical bevel gears, which fixed last year's gear slippage. The new three-finger gripper closes to a point, so it can also press buttons on a keyboard.",
      ],
      specs: [
        "5 degrees of freedom, folds compactly when stowed",
        "Axes 2 and 3: up to 182 N·m and 86 N·m of torque",
        "Harmonic reducers with 15 arcsecond backlash",
        "Rated to lift objects up to 10 kg",
      ],
      missions: ["Equipment Servicing", "Delivery"],
    },
    {
      tab: "Science Module",
      title: "Science Module",
      video: "assets/science-assemble.mp4",
      poster: "assets/science-assemble-poster.jpg",
      photo: drive("1UDfHRGeZON_HTvl0ZlXXtYSb28gj8RWC"),
      note: "The exploded view shows the sample collection (auger drill) module from the 2024 model.",
      paragraphs: [
        "The science module searches for signs of life. It is made up of three parts: sample collection, sample analysis, and the UV box.",
      ],
      parts: [
        { name: "Sample collection", text: "An auger drill collects soil from 10 cm down, below the layer exposed to UV radiation, and deposits it into a sealable cache." },
        { name: "Sample analysis", text: "Lipids are extracted with isopropyl alcohol, pumped into cuvettes on a rotating stage, and dyed with Sudan III. A Vernier spectrophotometer (380 to 950 nm) then checks for the absorbance peak that shows lipids are present." },
        { name: "UV box", text: "A folding bellows encloses a rock in complete darkness, and a camera records its UV fluorescence to look for carbonate and magnetite structures." },
      ],
      specs: [],
      missions: ["Astrobiology"],
    },
  ],

  /* ---------------------------------------------------------------
     SUBTEAMS (tabs). Each one has its leads inside it.
     Lead photo: "leads/name.jpg"  (leave "" for a blank photo)
     --------------------------------------------------------------- */
  subteams: [
    {
      name: "Mechanical",
      excerpt: "The Mechanical Team designs, develops, and builds many of the rover’s main subsystems, including the suspension, chassis, and robotic arm. Students on this team gain hands-on experience with CAD and manufacturing.",
      urc: "Mechanical builds the hardware the rover uses in every mission: a suspension that can cross the Utah terrain for the Delivery and Autonomy missions, and a robotic arm that can do the dexterous tasks in Equipment Servicing.",
      focus: [
        "Redesign the first axis of the robotic arm",
        "Refine the gripper to complete all SAR claw tasks",
        "Support the other subteams through mechanical design",
      ],
      leads: [
        { name: "Joshua Dang", role: "Mechanical Lead", photo: "leads/joshua-dang.jpg" },
      ],
      links: [
        { label: "Fusion 360 CAD repository", href: "", soon: true },
      ],
    },
    {
      name: "Hardware",
      excerpt: "The Hardware Team handles all of BILL-EE’s electrical systems, designing a modular, all-in-one solution to power and control the rover as well as developing the communications and ground station. Students on this team learn schematic design, PCB design, and firmware programming.",
      urc: "Every mission depends on hardware: reliable power to each subsystem, a long-range radio link between the rover and the ground station, and controls for the arm and science instruments.",
      focus: [
        "Rover Control Module: a custom PCB that powers every subsystem from four battery packs, running NASA JPL's F´ (F Prime) flight software on an RP2350",
        "Science Control Module on a Teensy 4.1, also running F´",
        "Point-to-point Ubiquiti radio link to the ground station",
        "Wiring harnesses for the inside of the rover",
      ],
      leads: [
        { name: "Luca Lanzillotta", role: "Hardware Lead", photo: "leads/luca-lanzillotta.jpg" },
      ],
      links: [
        { label: "Hardware repository on GitHub", href: "https://github.com/BILLEE-BroncoSTAR/billee-hardware-2027" },
      ],
    },
    {
      name: "Software",
      excerpt: "The Software Team programs the controls for each of the rover’s subsystems and develops autonomous behavior. Students on this team learn various programming languages, including C++, Python, and FPrime, as well as the implementation of ROS2.",
      urc: "Software drives the rover from the ground station in every mission and runs the Autonomy mission on its own: fusing GPS and IMU data, planning routes with Nav2, and finding its targets with the depth camera.",
      focus: [
        "ROS 2 Humble workspace with a full Gazebo simulation of the rover",
        "Drivetrain control over CAN, ZED 2i perception, and Foxglove operator views",
        "Improve autonomous navigation: waypoints and obstacle avoidance",
        "More complex arm behavior using inverse kinematics",
      ],
      leads: [
        { name: "Luca Lanzillotta", role: "Software Lead", photo: "leads/luca-lanzillotta.jpg" },
        { name: "Veronica Diaz", role: "Software Consultant", photo: "" },
      ],
      links: [
        { label: "Software repository (URC 2027)", href: "https://github.com/BroncoSpace-BILLEE/URC-2027" },
        { label: "Previous season (2026) software", href: "https://github.com/BILLEE-BroncoSTAR/BILLEE_software_2026" },
      ],
    },
    {
      name: "Science",
      excerpt: "The Science Team, split into two smaller teams: Science-Mechanical and Science-Research, focuses on developing the life detection modules necessary to detect the presence of life on Mars. Students on this team learn about the composition of Mars, experimental design, and the intersection between science and engineering.",
      urc: "Science is responsible for the Astrobiology mission: investigating field sites for evidence of life, analyzing samples on board the rover, and returning a sealed sample cache.",
      focus: [
        "Integrate last season's science developments onto the rover",
        "Refine soil transfer from the drill to the sample caches",
        "Build a chemical storage and distribution system for preparing samples",
        "Refine the sample rotation system and the UV spectroscopy unit",
      ],
      leads: [
        { name: "Josh Sandkulla", role: "Science Lead", photo: "leads/josh-sandkulla.jpg" },
      ],
      // The science mission, step by step (shown as a numbered list).
      missionSteps: [
        "Drill 10 cm into the soil and deposit the sample into a sealable cache.",
        "Mix the soil with isopropyl alcohol for five minutes to extract lipids.",
        "Pump the extract into cuvettes on the sample rotation system and add Sudan III dye.",
        "Measure absorbance with the spectrophotometer. A peak near 580 nm indicates lipids.",
        "Enclose rock samples in the UV box and image their fluorescence for carbonates and magnetites.",
      ],
      // Optional: a video of the science module running its procedure.
      //   "assets/science-procedure.mp4"  or a YouTube link
      procedureVideo: "",
      // Optional: the Science Experiment document. Use a Google Doc
      // "Publish to web" link or a PDF in assets (e.g. "assets/science-plan.pdf").
      experimentDoc: "",
      links: [],
    },
    {
      name: "Operations",
      excerpt: "The Operations Team handles all auxiliary tasks necessary to run BILL-EE! This includes budgeting, scheduling, marketing, and team engagement. Students on this team learn how to apply business skills to an engineering context, how to secure funding, and manage a team that delivers a functional system.",
      urc: "Operations keeps the project on track for URC: the budget, the schedule, the PDR and SAR submissions, and the logistics of getting the team and the rover to the finals in Utah.",
      focus: [
        "Budget management and fundraising",
        "Travel logistics for the URC finals",
        "Grow the team's social media presence",
        "Lay the groundwork for future teams",
      ],
      leads: [
        { name: "Caitlyn Alba", role: "Operations Lead", photo: "leads/caitlyn-alba.jpg" },
      ],
      links: [],
    },
  ],

  /* ---------------------------------------------------------------
     UNIVERSITY ROVER CHALLENGE
     --------------------------------------------------------------- */
  urc: {
    photo: drive("19MKbJtRWUcZct9i9Ylgd9ZmxoGDLovF_"),
    whatIs: "The Mars Society’s University Rover Challenge challenges students to build remotely operated rovers that can accomplish a variety of tasks that might one day assist astronauts working on the surface of Mars.",
    missions: [
      { name: "Astrobiology Mission", text: "Investigate field sites for evidence of life, analyze samples onboard, and return a sealed sample cache." },
      { name: "Delivery Mission", text: "Find, handle, transport, and deliver objects to simulated astronauts across difficult terrain." },
      { name: "Equipment Servicing Mission", text: "Use a robotic arm and related systems to perform dexterous tasks on a mock lander." },
      { name: "Autonomy Mission", text: "Autonomously assist an astronaut and autonomously find routes through a hilly area." },
    ],
    why: "We chose URC as our stepping stone because of its fascinating challenges, allowing us to explore our robotic expertise in various industries (such as biotechnical, mechanical, electrical, artificial intelligence, etc).",
    benefit: "Team members learn professional technical skills and other useful tools like CAD and ECAD software, composites 3D printing, electronics, power tools, manufacturing, and assembling methods that can be directly applied to the workforce.",
  },

  /* ---------------------------------------------------------------
     GALLERY: no captions. Add, remove, or reorder lines freely.
     --------------------------------------------------------------- */
  gallery: [
    drive("14GFTUrm0rWwUGHnXDplwrpMROf_QGcqy"),
    drive("1oZXSOWnfT-KkQmqITG2IkBmNSgWMpU8A"),
    drive("1lYWRYY2zDn3LJm6oR-o65BExkiJMs-kC"),
    drive("1U0UChw4HKRit4kKwPKzjKUMFQFr5TmSp"),
    drive("1ICVol5rg73wo385A6WGFgUaL6Qw9MDdh"),
    drive("1Hreyd1vK6uZbs7_x_3jDTThXFlH3hQUv"),
    drive("1AmvtLqihac2BlJ7vWqYxUP721VC9nr_4"),
    drive("1UDfHRGeZON_HTvl0ZlXXtYSb28gj8RWC"),
    drive("1hWHtQmlwqmy948lMEkZI5UFfBGN7fMN5"),
    drive("1SbdTm13dqi9ZCYSZqx_SY5tKwvOdp_0W"),
    drive("1TN3021cLkHdofwha3A8RizEW3yztSu4R"),
    drive("1_jgdPe7EFA4HFytrCqE-t1WrbGVaJI2T"),
    drive("19MKbJtRWUcZct9i9Ylgd9ZmxoGDLovF_"),
    drive("1mhqNtKNk_yydIZ2gJ9oz9rzI16QpJrWZ"),
    drive("1nZ6WDIjoNZ-1OBGxItGUTKNJvJXbUzt0"),
    drive("1LPaxIIw5qZVH55C3SY3wdKom3qf-NQNJ"),
    drive("12PUAiZahf87SYj66MVRJfbkY9vxmIfGu"),
    drive("1m-llGlTCySJ5HdS4SDd4Ja4Wez8mKClK"),
    // 2023-2024 season (URC Photos 2023-2024 album)
    "https://lh3.googleusercontent.com/pw/AP1GczPGwO1mOHCORlNNLjiPWJbMvhSozLK56RF5tQMgXvoGuMUpuy9jWctxhOvSQMfgpX-N_mVD8sgAwkQDzxFVpOOaQFTERiboZX91foVbsGRnDQebuWk=w1600",
    "https://lh3.googleusercontent.com/pw/AP1GczPMsZ-tfUWxoYbys8w9mhXgFzaIbazCYQJxgMhtfKcfaZzSloJ9y6m6guY65F4hJkZk4y1DoDKpqOAXJtZYXELv_LgSdoUXn9MmBDwh74boXFBveVo=w1600",
    "https://lh3.googleusercontent.com/pw/AP1GczMlniKdVGMm_J3KOqy9JCe8Pn1Jw1ox_54P1CkdG2r4pSCIBxEbSC1sXewBTT_F-7nmQK4nDikBzkKWgVOue5kHg3aLlrPn1uzxL_y8agi4vwqcqhw=w1600",
    "https://lh3.googleusercontent.com/pw/AP1GczN4EJ6T7JhLXuLU5_6-efrnS1VKFc0NgVwebtugdDDVplyUKw75CyF5p2vuGgUQr-elHtknz11P0_vJrxA2VYQ-gWJ3DC0DEoiVOIfrF6mBCK7kWVo=w1600",
    "https://lh3.googleusercontent.com/pw/AP1GczPE4xtTcutU7-j-I7h01VcNCQU_LDxR70TC7seLcvY3AKnhX59NuetIXp0mhl7fwRExwqvrCN6JtGWRRY4-Z6ia-c1qoLG3pN_akBnNxjW-DdehUNw=w1600",
    "https://lh3.googleusercontent.com/pw/AP1GczN6RP_GADQn7mkp0EYcZTTeBy5AdKFst03on8CrsbR5ryO1BCe4zPFN6FmzrhZTRYMC1VMLnBwxPKyEqBu4BhNqztu_gfW54JE5Bf0Kb0KX9bJAqOQ=w1600",
  ],

  /* ---------------------------------------------------------------
     RESOURCES: our public, open-source material.
     Leave href "" and set soon: true to show "Coming soon".
     --------------------------------------------------------------- */
  resources: [
    {
      group: "Code",
      items: [
        { title: "Rover software", detail: "ROS 2 Humble workspace: drivetrain control, Gazebo simulation, perception, and navigation. Current season.", tag: "GitHub", href: "https://github.com/BroncoSpace-BILLEE/URC-2027" },
        { title: "Hardware and firmware", detail: "KiCad projects for the Rover Control Module and the science, arm, drivetrain, and astronaut modules, plus the F´ firmware.", tag: "GitHub", href: "https://github.com/BILLEE-BroncoSTAR/billee-hardware-2027" },
        { title: "2026 season software", detail: "ROS packages from the 2025–26 rover.", tag: "GitHub", href: "https://github.com/BILLEE-BroncoSTAR/BILLEE_software_2026" },
      ],
    },
    {
      group: "Design",
      items: [
        { title: "Fusion 360 CAD", detail: "The rover's full mechanical design.", tag: "Fusion 360", href: "", soon: true },
      ],
    },
    {
      group: "Media",
      items: [
        { title: "URC 2026 System Acceptance Review video", detail: "Our 2026 SAR submission.", tag: "YouTube", href: "https://www.youtube.com/watch?v=xsm0fc5Iomc" },
        { title: "Team overview slides", detail: "The team and the rover in slides.", tag: "Google Slides", href: "https://docs.google.com/presentation/d/1Gn1ttvHhQ8mT0pDx2bw4OjPBhogjFKY4-ulJR0aSHrA/edit" },
        { title: "University Rover Challenge rules", detail: "Official requirements and guidelines from the Mars Society.", tag: "URC", href: "https://urc.marssociety.org/" },
      ],
    },
  ],
};
