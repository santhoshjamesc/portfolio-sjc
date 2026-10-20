// First-person lines shown as a chat notification when a visitor taps a card
export const EDU_NOTES = {
  "B.Tech – Computer Science & Engineering": "That's my B.Tech at CE Cherthala. Four years, a 7.1 CGPA, and where I really started building things.",
  "12th Grade – Bio-Maths": "My 12th, Bio-Maths. Scored 97%. Yep, I started with biology before code took over.",
  "10th Grade – High School": "That's my high school. Scored a full 100% here. This is where it all started.",
}

export const EXP_NOTES = {
  "Adviciya Solutions Pvt Ltd": "That's where I am right now. Shipping mobile apps and learning something new every week.",
  "Freelance": "Freelance. My own clients, my own deadlines, and a lot of lessons.",
  "Cube": "Cube was a short one. An ops role that taught me how teams really run.",
  "Skryfon Private Limited": "Everybody gets a start somewhere. Skryfon was mine, my first real job as a frontend dev.",
}

export const VOL_NOTES = {
  "Placement Cell CEC": "I handle media for the placement cell. Late-night posters are normal for me.",
  "NCC": "My NCC cadet days. That's where I picked up discipline, and early mornings.",
  "SPACSCEC": "I'm Vice Chair here. Mostly keeping people and plans on the same page.",
  "IEDC CEC": "My creative side. Design, media and campaigns for IEDC.",
}

const POOLS = {
  project: [
    (t) => `That's ${t}. Tap it open, I put screenshots inside.`,
    (t) => `Ah, ${t}. This one took a few late nights. Have a look!`,
    (t) => `${t}. Built it, broke it, fixed it. Check the stack inside.`,
    (t) => `Curious about ${t}? The code's on GitHub too.`,
  ],
  oss: [
    (t) => `That's ${t}. I published it so anyone can use it.`,
    (t) => `${t} is live on the registry. Install it and tell me what you think!`,
    (t) => `I open-sourced ${t}. Stars and issues are very welcome.`,
  ],
  cert: [
    (t) => `Got my ${t} certificate along the way. I'm always learning.`,
    (t) => `${t}, done and dusted. Next one's already on my list.`,
    (t) => `Proud of this ${t} one. It filled a real gap for me.`,
  ],
  service: [
    (t) => `Yes, I do ${t.toLowerCase()}. Happy to chat, just email me.`,
    (t) => `${t} is something I love working on. Got a project in mind?`,
    (t) => `Need ${t.toLowerCase()}? Tell me what you need and I'll tell you how long.`,
  ],
}

export const KINDS = {
  edu:     { label: "Education",   color: "#ff9f0a", badge: "🎓" },
  exp:     { label: "Work",        color: "#0a84ff", badge: "💼" },
  vol:     { label: "Community",   color: "#bf5af2", badge: "🤝" },
  project: { label: "Project",     color: "#30d158", badge: "🚀" },
  oss:     { label: "Open source", color: "#64d2ff", badge: "📦" },
  cert:    { label: "Certificate", color: "#ffd60a", badge: "🏅" },
  service: { label: "Services",    color: "#ff375f", badge: "🛠️" },
  link:    { label: "Link",        color: "#5ac8fa", badge: "↗" },
  contact: { label: "Contact",     color: "#34c759", badge: "✉️" },
  system:  { label: "Settings",    color: "#98989d", badge: "⚙️" },
}

const last = {}
export function noteFor(kind, label) {
  const pool = POOLS[kind]
  if (!pool) return ""
  let i
  do { i = Math.floor(Math.random() * pool.length) } while (pool.length > 1 && i === last[kind])
  last[kind] = i
  return pool[i](label.split(" – ")[0])
}
