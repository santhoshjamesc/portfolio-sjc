// ============================================================
// data/data.js — All portfolio data in one place
// ============================================================

export const NAV_LINKS = [
    { label: "About",      href: "#about"      },
    { label: "Skills",     href: "#skills"     },
    { label: "Projects",   href: "#projects"   },
    { label: "Experience", href: "#experience" },
    { label: "Education",  href: "#education"  },
    { label: "Contact",    href: "#contact"    },
  ];

  export const resumelink ="https://drive.google.com/file/d/16AIy1257bz_3Vzk1-nnn4EG6wz8odc0b/view?usp=sharing"
  
  export const SKILLS = [
    { title: "Languages", points: ["Python", "C", "C#", "JavaScript", "TypeScript", "Java"] },
    { title: "Web Development", points: ["HTML", "CSS", "React", "Node.js", "NestJS", "Django", "Tailwind CSS", "Gin Framework", "GORM", "REST APIs"] },
    { title: "Mobile Development", points: ["React Native", "Expo", "Zustand", "Context API", "Firebase Authentication", "FCM Push Notifications", "Payment Gateway Integration"] },
    { title: "Libraries & Frameworks", points: ["OpenCV", "Tkinter", "Haar Cascade", "Siamese Neural Network", "Unity", "Vuforia SDK"] },
    { title: "Databases & Storage", points: ["MySQL", "PostgreSQL", "Firebase Firestore", "Supabase Storage", "Redis"] },
    { title: "Tools & Platforms", points: ["GitHub", "VS Code", "Photoshop", "Premiere Pro", "Canva", "Android SDK", "Android Studio", "Xcode", "Postman", "Maestro"] },
    { title: "Soft Skills", points: ["Teamwork", "Problem Solving", "Leadership", "Creativity"] },
  ];
  
  export const PROJECTS = [
    {
      title: "Blog Page – Full-Featured Blogging Platform",
      description:
        "A blogging platform with admin capabilities including adding content, managing posts, and handling user interactions such as likes, dislikes, and comments. Provides a responsive, user-friendly interface for both readers and administrators.",
      stack: ["TypeScript", "React", "Tailwind CSS", "Golang", "Gin Framework", "GORM", "PostgreSQL/MySQL"],
      github: "https://github.com/santhoshjamesc/Blog-Page",
      images: [
        "https://github.com/santhoshjamesc/Blog-Page/blob/main/doc/Screenshot%202026-03-23%20125338.png?raw=true",
        "https://github.com/santhoshjamesc/Blog-Page/blob/main/doc/Screenshot%202026-03-23%20125343.png?raw=true",
        "https://github.com/santhoshjamesc/Blog-Page/blob/main/doc/Screenshot%202026-03-23%20125352.png?raw=true",
        "https://github.com/santhoshjamesc/Blog-Page/blob/main/doc/Screenshot%202026-03-23%20125657.png?raw=true",
        "https://github.com/santhoshjamesc/Blog-Page/blob/main/doc/Screenshot%202026-03-23%20125706.png?raw=true",
      ],
    },
    {
      title: "VISORA – AR-Based Educational Platform",
      description:
        "An immersive AR educational application that enables users to explore 3D content with voice narration, complete quizzes, and interact with an AI-powered chatbot. Admin panel supports user management, content moderation, and analytics. AI APIs generate 3D models from images to enhance learning experiences.",
      stack: ["Unity", "C#", "Android SDK", "Firebase Firestore", "Firebase Authentication", "Supabase Storage", "Vuforia SDK", "Gemini API", "Tripo3D API"],
      github: "https://github.com/santhoshjamesc/visora-admiin-panel",
      images: [
        "https://github.com/santhoshjamesc/visora-admiin-panel/blob/main/doc/WhatsApp%20Image%202026-03-23%20at%2013.33.01%20(1).jpeg?raw=true",
        "https://github.com/santhoshjamesc/visora-admiin-panel/blob/main/doc/WhatsApp%20Image%202026-03-23%20at%2013.33.01%20(2).jpeg?raw=true",
        "https://github.com/santhoshjamesc/visora-admiin-panel/blob/main/doc/WhatsApp%20Image%202026-03-23%20at%2013.33.01.jpeg?raw=true",
        "https://github.com/santhoshjamesc/visora-admiin-panel/blob/main/doc/WhatsApp%20Image%202026-03-23%20at%2013.33.59.jpeg?raw=true",
        "https://github.com/santhoshjamesc/visora-admiin-panel/blob/main/doc/WhatsApp%20Image%202026-03-23%20at%2013.33.02.jpeg?raw=true",
        "https://github.com/santhoshjamesc/visora-admiin-panel/blob/main/doc/WhatsApp%20Image%202026-03-23%20at%2013.33.02%20(2).jpeg?raw=true",
      ],
    },
    {
      title: "Trinetra – Missing Person Detection",
      description:
        "A real-time missing person detection system using facial recognition. Matches live camera feed against a database of missing persons using a Siamese Neural Network for high-accuracy identification.",
      stack: ["Python", "OpenCV", "Haar Cascade", "Tkinter", "Siamese Neural Network"],
      github: "https://github.com/santhoshjamesc/TRINETRA",
      images: [
        "https://github.com/santhoshjamesc/TRINETRA/blob/main/screenshots/Screenshot%202025-03-18%20151001.png?raw=true",
        "https://github.com/santhoshjamesc/TRINETRA/blob/main/screenshots/Screenshot%202025-03-18%20151113.png?raw=true",
        "https://github.com/santhoshjamesc/TRINETRA/blob/main/screenshots/Screenshot%202025-03-18%20151445.png?raw=true",
        "https://github.com/santhoshjamesc/TRINETRA/blob/main/screenshots/Screenshot%202025-04-03%20184637.png?raw=true",
      ],
    },
    {
      title: "TECH-PHARMA",
      description:
        "A location-aware pharmacy management and search platform connecting patients, doctors, and pharmacies. Provides real-time medicine availability, online doctor consultations, alternative medicine suggestions, and streamlined stock management via a unified digital interface.",
      stack: ["TypeScript", "React", "Tailwind CSS", "Golang", "Gin Framework", "GORM", "PostgreSQL/MySQL", "Redis"],
      github: "https://github.com/zorqentpvt/techpharma",
      images: [
        "https://github.com/zorqentpvt/techpharma/blob/main/docs/up.png?raw=true",
        "https://github.com/zorqentpvt/techpharma/blob/main/docs/store.png?raw=true",
        "https://github.com/zorqentpvt/techpharma/blob/main/docs/home.png?raw=true",
        "https://github.com/zorqentpvt/techpharma/blob/main/docs/doc_appointment.png?raw=true",
        "https://github.com/zorqentpvt/techpharma/blob/main/docs/med_search.png?raw=true",
      ],
    },
    {
      title: "Football Turf Booking Website",
      description:
        "A full-stack web platform for discovering and booking football turfs. Users can browse available slots, view turf details, and make reservations with real-time availability.",
      stack: ["HTML", "CSS", "JavaScript", "MySQL", "Node.js"],
      github: "https://github.com/santhoshjamesc/turfsfinder",
      images: [
        "https://github.com/santhoshjamesc/turfsfinder/blob/main/SCREENSHOTS/Screenshot%202025-06-06%20161738.png?raw=true",
        "https://github.com/santhoshjamesc/turfsfinder/blob/main/SCREENSHOTS/Screenshot%202025-06-06%20161751.png?raw=true",
        "https://github.com/santhoshjamesc/turfsfinder/blob/main/SCREENSHOTS/Screenshot%202025-06-06%20162513.png?raw=true",
      ],
    },
    {
      title: "Exam Seat Arrangement System",
      description:
        "Automates exam hall seat allocation for colleges. Generates optimized seating plans based on student count, hall capacity, and department constraints, exportable as printable sheets.",
      stack: ["HTML", "CSS", "JavaScript", "Python", "MySQL", "Django"],
      github: "https://github.com/santhoshjamesc/EXAM-SEAT-SCHEDULER-USING-PYTHON-DJANGO",
      images: [
        "https://github.com/santhoshjamesc/EXAM-SEAT-SCHEDULER-USING-PYTHON-DJANGO/blob/main/screenshots/Screenshot%202025-05-12%20171608.png?raw=true",
        "https://github.com/santhoshjamesc/EXAM-SEAT-SCHEDULER-USING-PYTHON-DJANGO/blob/main/screenshots/Screenshot%202025-05-12%20171616.png?raw=true",
      ],
    },
    {
      title: "Quiz Website",
      description:
        "An interactive frontend quiz app with multiple categories, timed questions, score tracking, and a results summary screen. Clean UI with instant feedback on each answer.",
      stack: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/santhoshjamesc/quiz-website-frontend",
      images: [
        "https://github.com/santhoshjamesc/quiz-website-frontend/blob/main/Screenshot%202025-06-06%20170120.png?raw=true",
        "https://github.com/santhoshjamesc/quiz-website-frontend/blob/main/Screenshot%202025-06-06%20170144.png?raw=true",
      ],
    },
    {
      title: "React JS To-Do App",
      description:
        "A minimal task management app built with React. Supports adding, completing, and deleting tasks with persistent state and a clean, responsive interface.",
      stack: ["React.js", "Vite"],
      github: "https://github.com/santhoshjamesc/react-todo",
      images: [
        "https://github.com/santhoshjamesc/react-todo/blob/main/vite-project/Screenshot%202025-06-06%20171710.png?raw=true",
        "https://github.com/santhoshjamesc/react-todo/blob/main/vite-project/Screenshot%202025-06-06%20171734.png?raw=true",
      ],
    },
  ];
  
  export const OPEN_SOURCE = [
    {
      kind: "npm",
      name: "react-native-floating-glass-tabbar",
      version: "0.1.0",
      license: "MIT",
      description:
        "Floating frosted-glass pill tab bar for React Native. A custom tabBar for React Navigation bottom tabs and expo-router, with a spring-animated indicator, label modes, badges, RTL and collapse-on-scroll.",
      tags: ["React Native", "Expo Router", "React Navigation", "Reanimated"],
      link: "https://www.npmjs.com/package/react-native-floating-glass-tabbar",
      repo: "https://github.com/santhoshjamesc/react-native-floating-glass-tabbar",
    },
    {
      kind: "npm",
      name: "react-native-collapsible-sticky-header",
      version: "0.1.0",
      license: "MIT",
      description:
        "A fully configurable collapsing hero header with a sticky compact bar for React Native (iOS & Android), powered by Reanimated.",
      tags: ["React Native", "Reanimated", "iOS", "Android"],
      link: "https://www.npmjs.com/package/react-native-collapsible-sticky-header",
      repo: "https://github.com/santhoshjamesc/react-native-collapsible-sticky-header",
    },
    {
      kind: "npm",
      name: "react-appointment-ui",
      version: "1.0.1",
      license: "ISC",
      description: "Appointment calendar React component library.",
      tags: ["React", "Calendar", "UI Library"],
      link: "https://www.npmjs.com/package/react-appointment-ui",
    },
    {
      kind: "vscode",
      name: "Git Limiter",
      version: "0.1.0",
      license: "MIT",
      description:
        "Nudges you (with sound and bad jokes) to open a PR while it's still small enough to review. Limits files and lines per file, with a status bar meter.",
      tags: ["VS Code", "Git", "Productivity"],
      link: "https://marketplace.visualstudio.com/items?itemName=SANTHOSHJAMESC.gitlimiter",
      repo: "https://github.com/santhoshjamesc/gitlimiter",
    },
    {
      kind: "vscode",
      name: "PR Reminder & Alert",
      version: "0.2.0",
      description:
        "Tracks your GitHub pull requests, sends reviewers private Google Chat reminders, and shows hard-to-miss alerts for PR activity.",
      tags: ["VS Code", "GitHub", "Google Chat"],
      link: "https://marketplace.visualstudio.com/items?itemName=SANTHOSHJAMESC.pr-reminder-alert",
    },
  ];

  export const OPEN_SOURCE_PROFILES = [
    { label: "NPM",       href: "https://www.npmjs.com/~santhoshjamesc" },
    { label: "VS Marketplace", href: "https://marketplace.visualstudio.com/publishers/santhoshjamesc" },
    { label: "GitHub",      href: "https://github.com/santhoshjamesc" },
  ];

  export const CERTIFICATES = [
    { title: "HTML",  image: "html.webp"  },
    { title: "Git",   image: "git.webp"   },
    { title: "React", image: "react.webp" },
    { title: "AI",    image: "ai.webp"    },
  ];
  
  export const VOLUNTEERING = [
    {
      role:     "Head of Media",
      org:      "Placement Cell CEC",
      duration: "2023–Present",
      details:  "Media & branding for placement activities",
    },
    {
      role:     "Cadet",
      org:      "NCC",
      duration: "2016–2018",
      details:  "Discipline, leadership & field training",
    },
    {
      role:     "Vice Chair",
      org:      "SPACSCEC",
      duration: "2024–Present",
      details:  "Leadership & student coordination",
    },
    {
      role:     "Creative Team",
      org:      "IEDC CEC",
      duration: "2023–2024",
      details:  "Design, media & creative campaigns",
    },
  ];
  
  export const EDUCATION = [
    {
      institute: "College of Engineering, Cherthala",
      degree:    "B.Tech – Computer Science & Engineering",
      location:  "Cherthala, Kerala",
      mapLink:   "https://maps.google.com/?q=College+of+Engineering+Cherthala",
      batch:     "2021–2025",
      score:     7.1,
      type:      "cgpa",
    },
    {
      institute: "SCUGVHSS Pattanakad",
      degree:    "12th Grade – Bio-Maths",
      location:  "Pattanakad, Kerala",
      mapLink:   "https://maps.google.com/?q=SCUGVHSS+Pattanakad",
      batch:     "2019–2021",
      score:     97,
      type:      "percentage",
    },
    {
      institute: "SCUGVHSS Pattanakad",
      degree:    "10th Grade – High School",
      location:  "Pattanakad, Kerala",
      mapLink:   "https://maps.google.com/?q=SCUGVHSS+Pattanakad",
      batch:     "2018–2019",
      score:     100,
      type:      "percentage",
    },
  ];

  // ── Updated data/data.js ─────────────────

export const SERVICES = [
    {
      title: "Android Development",
      icon: "android",
      description:
        "Native and cross-platform Android apps.",
    },
    {
      title: "Mobile Application Development",
      icon: "mobile",
      description:
        "Scalable mobile apps for iOS and Android.",
    },
    {
      title: "Web Design",
      icon: "design",
      description:
        "User-centric, responsive interfaces.",
    },
    {
      title: "Web Development",
      icon: "web",
      description:
        "Fast web apps with React and TypeScript.",
    },
  ];
  
  export const EXPERIENCE = [
    {
      company: "Adviciya Solutions Pvt Ltd",
      role: "Junior Software Developer",
      logo: "/adviciya-logo.webp",
      dates: "Apr 2026 – Present · Kochi, Kerala",
      responsibilities: [
        "Developed and shipped 7 cross-platform mobile apps for Android and iOS using React Native (Expo) and TypeScript, plus 1 backend service; turned UI/UX designs into reusable, responsive screens and components.",
        "Handled the full release cycle: iOS and Android builds distributed for testing and apps published on the Google Play Store.",
        "Integrated a payment gateway with webhook-based payment confirmation; implemented Firebase Authentication, FCM push notifications and state management (Zustand, Context API).",
        "Built backend REST APIs with Node.js (NestJS) and PostgreSQL and integrated them into the mobile apps with async data fetching and error handling.",
        "Debugged and tested on Android Studio emulators, Xcode simulators and real devices; automated UI flows with Maestro and verified APIs with Postman.",
      ],
      techStack: ["React Native", "Expo", "TypeScript", "NestJS", "PostgreSQL", "Firebase", "Zustand"],
    },
    {
      company: "Freelance",
      role: "Software Developer",
      dates: "Sep 2025 – Present",
      logo: "https://zorqent.com/assets/logo-CX_dplAj.jpg",
      responsibilities: [
        "Developing web and mobile applications for clients using modern frameworks.",
        "Collaborating with clients to understand requirements and deliver tailored solutions.",
        "Maintaining and improving performance across projects.",
      ],
      techStack: ["Unity", "React.js", "TypeScript", "Node.js"],
    },
    {
      company: "Cube",
      role: "Operation Associate",
      dates: "Oct 2025 – Nov 2025",
      logo: "/cube-logo.webp",
      responsibilities: [
        "Assisted in operational workflows and internal processes.",
        "Collaborated with team members to improve efficiency and coordination.",
      ],
      techStack: [],
    },
    {
      company: "Skryfon Private Limited",
      role: "Frontend Developer",
      dates: "Jun 2025 – Sep 2025",
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAUVBMVEVHcEwAAAIAAAIAAAIAAAICAgIAAAEAAAIAAAEAAAIAAAHCwsJ+fn7g4OBDQ0OUlJT////Q0NAeHh4zMzRVVVX8/Py5ubmlpaXw8PBsbGwAAADQLSsVAAAAG3RSTlMAPYa64PkJkP911vL19O/y//T69/T18PP089eO/8fJAAABEElEQVR4AWySB27AIAwAzXDi7J1A///QNsPGoJ42nLxBYazziN5ZA/9Q1aSoKyhoqKCBjJYysOup1eGRqB9GYqZ5WYkwpUHahnm+X2/249jfOBJ/PeeXCwmXeeJILde3h5m55g6LSiv6Ix5shJ0Udxk1F8YMGwk1AEhrpygqC4AhYV1SKfxmwJIiVXv074sFd0ePxPRFtQ78U58a4zUz95sHim/YBdMilICAlxQmyjgowROeqTCmSymc7k/GeLLgwOb97YVgwej+TtwKwQCk/oYNu6MQeFmysJALNa+b/0uhkoNmIU/RyEmzMOgitx85WhZkaeftoj77mxHVJKOcvWTRxPukE7/Dk/UIZ16C2R8AHo4jU6Qzsw0AAAAASUVORK5CYII=",
      responsibilities: [
        "Built responsive UI components using React, TypeScript, and Tailwind.",
        "Assisted in testing, debugging, and improving code quality.",
        "Demonstrated consistency, adaptability, and eagerness to learn.",
        "Published internal NPM UI library to standardize components and improve efficiency.",
        "Managed Git branches and merge workflows for clean version control.",
        "Integrated REST APIs using Axios and validated endpoints with Postman.",
      ],
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "API Development",
        "Git",
        "Postman",
      ],
    },
  ];
  export const CONTACTS = [
    {
      icon: "📞",
      label: "PHONE",
      value: "7306684286",
      href: "tel:+917306684286",
      type: "phone",
    },
    {
      icon: "📧",
      label: "EMAIL",
      slug: "gmail",
      color: "#EA4335",
      value: "santhoshjames527@gmail.com",
      href: "mailto:santhoshjames527@gmail.com",
      type: "email",
    },
    {
      icon: "📸",
      label: "INSTAGRAM",
      slug: "instagram",
      color: "#E4405F",
      value: "santhoshjames.c",
      href: "https://www.instagram.com/santhoshjames.c/",
      type: "link",
    },
    {
      icon: "🔗",
      label: "LINKEDIN",
      slug: "linkedin",
      color: "#0A66C2",
      value: "santhosh-james",
      href: "https://www.linkedin.com/in/sjc730/",
      type: "link",
    },
    {
      icon: "💻",
      label: "GITHUB",
      slug: "github",
      color: "#FFFFFF",
      value: "santhoshjamesc",
      href: "https://github.com/santhoshjamesc",
      type: "link",
    },
    {
      icon: "📦",
      label: "NPM",
      slug: "npm",
      color: "#CB3837",
      value: "santhoshjamesc",
      href: "https://www.npmjs.com/~santhoshjamesc",
      type: "link",
    },
    {
      icon: "💼",
      label: "UPWORK",
      slug: "upwork",
      color: "#14A800",
      value: "santhoshjamesc",
      href: "https://www.upwork.com/freelancers/~0154cfaeef6a85e89c",
      type: "link",
    },
  ]
  export const FOOTER = {
    name:   "SANTHOSH JAMES C",
    detail: "CSE · 2025 · KERALA",
  };

