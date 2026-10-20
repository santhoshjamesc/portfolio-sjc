// Skill name -> icon URL (devicon / simple-icons via jsDelivr, pinned versions)
const D = (n, v = "original") => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${n}/${n}-${v}.svg`
const S = (n) => `https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons/${n}.svg`

export const TECH_ICONS = {
  "Python": D("python"), "C": D("c"), "C#": D("csharp"), "JavaScript": D("javascript"),
  "TypeScript": D("typescript"), "Java": D("java"), "HTML": D("html5"), "CSS": D("css3"),
  "React": D("react"), "Node.js": D("nodejs"), "NestJS": D("nestjs"), "Django": D("django", "plain"),
  "Tailwind CSS": D("tailwindcss"), "Gin Framework": S("gin"), "GORM": D("go"), "REST APIs": D("swagger"),
  "React Native": D("react"), "Expo": S("expo"), "Zustand": D("react"), "Context API": D("react"),
  "Firebase Authentication": D("firebase"), "FCM Push Notifications": D("firebase"),
  "Payment Gateway Integration": S("stripe"),
  "OpenCV": D("opencv"), "Tkinter": D("python"), "Haar Cascade": D("opencv"),
  "Siamese Neural Network": D("tensorflow"), "Unity": D("unity"), "Vuforia SDK": D("unity"),
  "MySQL": D("mysql"), "PostgreSQL": D("postgresql"), "Firebase Firestore": D("firebase"),
  "Supabase Storage": D("supabase"), "Redis": D("redis"),
  "GitHub": D("github"), "VS Code": D("vscode"), "Photoshop": D("photoshop"), "Premiere Pro": D("premierepro"),
  "Canva": D("canva"), "Android SDK": D("android"), "Android Studio": D("androidstudio"),
  "Xcode": D("xcode"), "Postman": D("postman"),
}
