import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Mail, Download, ExternalLink,
  Copy, Check, ChevronDown, Menu, X, Briefcase, GraduationCap,
  Cpu, Layers, User, ArrowRight, Star
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Projects", "Experience"];

const SKILLS = [
  { category: "Frontend", color: "#00d9ff", items: ["React.js", "Next.js", "JavaScript", "HTML5", "Tailwind CSS"] },
  { category: "Backend", color: "#7c3aed", items: ["Node.js", "Express.js", "REST APIs", "JWT", "RBAC"] },
  { category: "Database", color: "#10b981", items: ["MongoDB", "Cloud Firestore", "Firebase Auth"] },
  { category: "DevOps", color: "#f59e0b", items: ["Git / GitHub", "Vercel", "CI/CD", "Code Splitting"] },
  { category: "Concepts", color: "#ef4444", items: ["Component Architecture", "Performance Optimization", "Error Handling", "Real-time Sync"] },
];

const PROJECTS = [
  {
    title: "Auto-Swift",
    subtitle: "Vehicle Service Management Platform",
    description: "Full-stack vehicle service management app with integrated chatbot, mileage calculator, and service package management. Serverless Firebase backend with real-time Firestore sync.",
    tech: ["React", "Node.js", "Firebase", "Firestore", "Tailwind CSS"],
    color: "#00d9ff",
    icon: "🚗",
    live: "https://your-autoswift-live-url.vercel.app",   // 🔗 REPLACE with your live URL
    code: "https://github.com/yourusername/auto-swift",   // 🔗 REPLACE with your GitHub repo URL
  },
  {
    title: "Fit Pro",
    subtitle: "High-Performance Fitness App",
    description: "Fitness platform with protein tracker, BMI/body analysis tools, progress dashboards, multi-page routing. Firebase Auth + Firestore for persistent user data.",
    tech: ["React", "Vite", "Tailwind CSS", "Firebase", "react-router-dom"],
    color: "#10b981",
    icon: "💪",
    live: "https://your-fitpro-live-url.vercel.app",      // 🔗 REPLACE with your live URL
    code: "https://github.com/yourusername/fit-pro",      // 🔗 REPLACE with your GitHub repo URL
  },
 
  {
    title: "Office Asset Allocation",
    subtitle: "IT Helpdesk & Asset Management UI",
    description: "Enterprise-grade IT helpdesk UI for managing office assets, ticket tracking, allocation workflows, and reporting dashboards.",
    tech: ["React", "Next.js", "MongoDB", "Tailwind CSS", "REST API"],
    color: "#f59e0b",
    icon: "🖥️",
    live: "https://your-officeasset-live-url.vercel.app",  // 🔗 REPLACE with your live URL
    code: "https://github.com/yourusername/office-asset",  // 🔗 REPLACE with your GitHub repo URL
  },
];

const TIMELINE = [
  {
    type: "work",
    title: "MERN Stack Intern",
    org: "Pisoft Informatics",
    date: "Jan 2026 – Present",
    points: [
      "Developed scalable web apps with MERN stack across multiple live projects",
      "Engineered custom RESTful APIs for MongoDB ↔ React communication",
      "Implemented JWT authentication + Role-Based Access Control (RBAC)",
    ],
    color: "#00d9ff",
  },
  {
    type: "work",
    title: "Web Developer",
    org: "Scholiverse",
    date: "May 2024 – Jul 2024",
    points: [
      "Built React.js frontend for a real-time chatbot with cross-device UX",
      "Automated data backup tasks saving 2 hours per week",
      "Delivered chatbot solution collaboratively for a company client",
    ],
    color: "#7c3aed",
  },
  {
    type: "edu",
    title: "B.Tech – Computer Science",
    org: "I.K.Gujral Punjab Technical University",
    date: "2022 – 2026",
    points: [
      "Kapurthala, Punjab, India",
      "Specialization in full-stack web development",
      "Active contributor to college tech projects",
    ],
    color: "#10b981",
  },
];

const CERTS = [
  { title: "MERN Stack Training", issuer: "Udemy" },
  { title: "Generative AI Mastermind", issuer: "Outskill" },
  { title: "Adobe Marketing Bootcamp", issuer: "Adobe" },
  { title: "Web Development Training", issuer: "Udemy" },
];

// ─── ANIMATIONS ──────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  }),
};

function RevealSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─── GRID BACKGROUND ─────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.04 }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d9ff" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        transition: "all 0.3s",
        background: scrolled ? (dark ? "rgba(8,12,20,0.92)" : "rgba(255,255,255,0.92)") : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? (dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)") : "none",
      }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => scrollTo("hero")}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#00d9ff", background: "none", border: "none", cursor: "pointer" }}>
          <span style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}></span>
        </button>

        <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)}
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.05em", color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = dark ? "#00d9ff" : "#2563eb"}
              onMouseLeave={e => e.target.style.color = dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.5)"}>
              {l}
            </button>
          ))}
          <button onClick={() => setDark(!dark)}
            style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", cursor: "pointer", fontSize: 16 }}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "white" : "black" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: dark ? "#080c14" : "white", borderTop: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ fontSize: 14, fontWeight: 500, textAlign: "left", color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", background: "none", border: "none", cursor: "pointer" }}>
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── TYPING EFFECT ────────────────────────────────────────────────────────────

function TypingText({ lines, dark }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const current = lines[lineIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }, 65);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }, 38);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setLineIdx(i => (i + 1) % lines.length);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, lineIdx, lines]);

  return (
    <span>
      {display}
      <span style={{ display: "inline-block", width: 2, height: "1em", marginLeft: 4, verticalAlign: "middle", backgroundColor: dark ? "#00d9ff" : "#2563eb", animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ dark }) {
  const [copied, setCopied] = useState(false);
  const email = "bhullarsandipan@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px 40px", paddingTop: 64, position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: dark ? "radial-gradient(circle, rgba(0,217,255,0.06) 0%, transparent 70%)" : "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", padding: "6px 12px", borderRadius: 999, border: dark ? "1px solid rgba(0,217,255,0.3)" : "1px solid rgba(37,99,235,0.25)", background: dark ? "rgba(0,217,255,0.05)" : "rgba(37,99,235,0.05)", color: dark ? "#00d9ff" : "#2563eb", marginBottom: 24 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "blink 1.5s ease infinite" }} />
                Available for opportunities
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)", fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.08, marginBottom: 16, letterSpacing: "-0.03em", color: dark ? "white" : "#0f172a" }}>
              <span style={{ fontWeight: 300, color: dark ? "rgba(255,255,255,0.5)" : "rgba(15,23,42,0.45)", display: "block" }}>Sandipan</span>
              <span style={{ fontWeight: 800, display: "block" }}>
                <span style={{ color: dark ? "#00d9ff" : "#2563eb" }}>Singh</span>{" "}Bhullar
              </span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, marginBottom: 32, minHeight: "2rem", color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)" }}>
              <TypingText lines={["MERN Stack Developer", "UI/UX Enthusiast", "React Specialist", "Full-Stack Engineer"]} dark={dark} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
              <motion.a href="/resume.pdf" download="Sandipan_Singh_Bhullar_Resume.pdf" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none", background: dark ? "#00d9ff" : "#2563eb", color: dark ? "#080c14" : "white", boxShadow: dark ? "0 0 24px rgba(0,217,255,0.3)" : "0 4px 20px rgba(37,99,235,0.3)", transition: "all 0.2s" }}>
                <Download size={15} /> Download Resume <ArrowRight size={13} />
              </motion.a>

              <motion.button onClick={copyEmail} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 12, fontWeight: 700, fontSize: 14, border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)", background: dark ? "rgba(255,255,255,0.04)" : "white", color: dark ? "rgba(255,255,255,0.6)" : "#374151", cursor: "pointer", transition: "all 0.2s" }}>
                {copied ? <><Check size={14} style={{ color: "#4ade80" }} /> Copied!</> : <><Copy size={14} /> Copy Email</>}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
              style={{ display: "flex", alignItems: "center", gap: 24 }}>
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: `mailto:${email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, textDecoration: "none", color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)", transition: "color 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.color = dark ? "#00d9ff" : "#2563eb"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)"; }}>
                  <Icon size={18} />
                  <span style={{ display: "none" }} className="sm:inline-block">{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* Terminal */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block">
            <div style={{ borderRadius: 20, overflow: "hidden", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(0,0,0,0.1)", background: "#0d1117", boxShadow: dark ? "0 0 60px rgba(0,217,255,0.07), 0 40px 80px rgba(0,0,0,0.5)" : "0 40px 80px rgba(0,0,0,0.15)" }}>
              {/* Title bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(239,68,68,0.7)" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(234,179,8,0.7)" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(34,197,94,0.7)" }} />
                <span style={{ marginLeft: 8, fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "'JetBrains Mono', monospace" }}>~/portfolio — bash</span>
              </div>
              <div style={{ padding: "24px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.65)" }}>
                <div><span style={{ color: "#00d9ff" }}>~</span> <span style={{ color: "#c084fc" }}>whoami</span></div>
                <div style={{ color: "rgba(255,255,255,0.85)", paddingLeft: 8 }}>Sandipan Singh Bhullar</div>
                <div style={{ marginTop: 8 }}><span style={{ color: "#00d9ff" }}>~</span> <span style={{ color: "#c084fc" }}>cat</span> <span style={{ color: "#4ade80" }}>skills.json</span></div>
                <div style={{ paddingLeft: 8, color: "rgba(255,255,255,0.5)" }}>
                  <div><span style={{ color: "#fde047" }}>"stack"</span>: <span style={{ color: "#4ade80" }}>["React", "Node", "MongoDB"]</span>,</div>
                  <div><span style={{ color: "#fde047" }}>"tools"</span>: <span style={{ color: "#4ade80" }}>["Firebase", "Git", "Vercel"]</span>,</div>
                  <div><span style={{ color: "#fde047" }}>"status"</span>: <span style={{ color: "#00d9ff" }}>"Building cool stuff 🚀"</span></div>
                </div>
                <div style={{ marginTop: 8 }}><span style={{ color: "#00d9ff" }}>~</span> <span style={{ color: "#c084fc" }}>node</span> <span style={{ color: "#4ade80" }}>experience.js</span></div>
                <div style={{ paddingLeft: 8, color: "rgba(255,255,255,0.35)", fontSize: 12 }}>// Fetching records...</div>
                <div style={{ paddingLeft: 8, color: "#4ade80" }}>✓ MERN Intern @ Pisoft (Jan 2026)</div>
                <div style={{ paddingLeft: 8, color: "#4ade80" }}>✓ Web Dev @ Scholiverse (2024)</div>
                <div style={{ paddingLeft: 8, color: "#00d9ff", animation: "blink 1s step-end infinite" }}>▌</div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ display: "flex", justifyContent: "center", marginTop: 80 }}>
          <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "none", border: "none", cursor: "pointer", color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)", animation: "bounce 2s infinite" }}>
            <ChevronDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────

function About({ dark }) {
  return (
    <section id="about" style={{ padding: "112px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 3, height: 22, borderRadius: 2, background: dark ? "#00d9ff" : "#2563eb" }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: dark ? "#00d9ff" : "#2563eb", fontWeight: 500 }}>About Me</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: 64, color: dark ? "white" : "#0f172a", lineHeight: 1.15 }}>
            Crafting digital experiences<br />
            <span style={{ fontWeight: 300, color: dark ? "rgba(255,255,255,0.45)" : "rgba(15,23,42,0.4)" }}>that actually matter.</span>
          </h2>
        </RevealSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <RevealSection>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.8, color: dark ? "rgba(255,255,255,0.55)" : "#6b7280" }}>
              <p>I'm a <strong style={{ color: dark ? "white" : "#111827" }}>B.Tech Computer Science</strong> student at IK Gujral Punjab Technical University, passionate about building fast, accessible, and visually polished web applications using the MERN stack.</p>
              <p>Currently interning at <span style={{ color: dark ? "#00d9ff" : "#2563eb" }}>Pisoft Informatics</span> where I architect RESTful APIs, implement JWT-based auth systems, and ship production-grade features daily.</p>
              <p>I believe great software is at the intersection of <strong style={{ color: dark ? "rgba(255,255,255,0.85)" : "#374151" }}>engineering rigor and design thinking</strong> — every component, every state, every interaction deserves intentionality.</p>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginTop: 40 }}>
              {[["3+", "Projects Shipped"], ["2+", "Years Coding"], ["4", "Certifications"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em", color: dark ? "#00d9ff" : "#2563eb" }}>{num}</div>
                  <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.35)" : "#9ca3af", marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <div style={{ padding: 24, borderRadius: 20, border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f3f4f6", background: dark ? "rgba(255,255,255,0.02)" : "#f9fafb" }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: dark ? "rgba(255,255,255,0.25)" : "#9ca3af", marginBottom: 20 }}>// Certifications</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {CERTS.map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 14, transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,0.04)" : "white"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", background: dark ? "rgba(0,217,255,0.08)" : "#eff6ff", flexShrink: 0 }}>
                      <Star size={14} style={{ color: dark ? "#00d9ff" : "#3b82f6" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: dark ? "rgba(255,255,255,0.75)" : "#374151" }}>{c.title}</div>
                      <div style={{ fontSize: 11, color: dark ? "rgba(255,255,255,0.3)" : "#9ca3af" }}>{c.issuer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function SkillCard({ skill, dark, index }) {
  return (
    <motion.div custom={index} variants={fadeUp}
      whileHover={{ y: -6 }}
      style={{ padding: 24, borderRadius: 20, border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f3f4f6", background: dark ? "#0d1117" : "white", cursor: "default", transition: "all 0.3s", boxShadow: dark ? "none" : "0 1px 3px rgba(0,0,0,0.04)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 60px ${skill.color}18`; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.12)" : "#e5e7eb"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? "none" : "0 1px 3px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "#f3f4f6"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: skill.color, boxShadow: `0 0 10px ${skill.color}90`, flexShrink: 0 }} />
        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.1em", color: dark ? "rgba(255,255,255,0.35)" : "#9ca3af" }}>{skill.category}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {skill.items.map(item => (
          <span key={item} style={{ padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f3f4f6", background: dark ? "rgba(255,255,255,0.02)" : "#f9fafb", color: dark ? "rgba(255,255,255,0.55)" : "#6b7280" }}>
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Skills({ dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" style={{ padding: "112px 24px", background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealSection style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 3, height: 22, borderRadius: 2, background: dark ? "#00d9ff" : "#2563eb" }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: dark ? "#00d9ff" : "#2563eb", fontWeight: 500 }}>Skills</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.025em", color: dark ? "white" : "#0f172a", lineHeight: 1.15 }}>
            Tools of the{" "}
            <span style={{ fontWeight: 300, color: dark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)" }}>trade.</span>
          </h2>
        </RevealSection>

        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {SKILLS.map((s, i) => <SkillCard key={s.category} skill={s} dark={dark} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function ProjectCard({ project, dark, index }) {
  return (
    <motion.div custom={index} variants={fadeUp}
      whileHover={{ y: -8 }}
      style={{ borderRadius: 20, border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f3f4f6", background: dark ? "#0d1117" : "white", overflow: "hidden", display: "flex", flexDirection: "column", transition: "all 0.3s", boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,0.05)" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 24px 60px ${project.color}15`; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "#e5e7eb"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = dark ? "none" : "0 1px 4px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.06)" : "#f3f4f6"; }}>

      {/* Image placeholder */}
      <div style={{ height: 180, background: `linear-gradient(135deg, ${project.color}12, ${project.color}04)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72, position: "relative", overflow: "hidden" }}>
        <span style={{ opacity: 0.4 }}>{project.icon}</span>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 100%, ${project.color}08, transparent 60%)` }} />
      </div>

      <div style={{ padding: 24, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: dark ? "white" : "#111827", marginBottom: 2 }}>{project.title}</h3>
            <p style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.35)" : "#9ca3af" }}>{project.subtitle}</p>
          </div>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: project.color, boxShadow: `0 0 8px ${project.color}`, marginTop: 6, flexShrink: 0 }} />
        </div>

        <p style={{ fontSize: 13, lineHeight: 1.7, color: dark ? "rgba(255,255,255,0.45)" : "#6b7280", flex: 1, marginTop: 8 }}>{project.description}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {project.tech.map(t => (
            <span key={t} style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", border: dark ? "1px solid rgba(255,255,255,0.07)" : "1px solid #f3f4f6", background: dark ? "rgba(255,255,255,0.02)" : "#f9fafb", color: dark ? "rgba(255,255,255,0.45)" : "#6b7280" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <a href={project.code} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 10, border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb", color: dark ? "rgba(255,255,255,0.5)" : "#6b7280", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = dark ? "white" : "#374151"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.2)" : "#d1d5db"; }}
            onMouseLeave={e => { e.currentTarget.style.color = dark ? "rgba(255,255,255,0.5)" : "#6b7280"; e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.1)" : "#e5e7eb"; }}>
            <Github size={13} /> View Code
          </a>
          <a href={project.live}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, padding: "7px 14px", borderRadius: 10, background: project.color, color: "#080c14", textDecoration: "none", boxShadow: `0 0 16px ${project.color}40` }}>
            <ExternalLink size={13} /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Projects({ dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" style={{ padding: "112px 24px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <RevealSection style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 3, height: 22, borderRadius: 2, background: dark ? "#00d9ff" : "#2563eb" }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: dark ? "#00d9ff" : "#2563eb", fontWeight: 500 }}>Projects</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.025em", color: dark ? "white" : "#0f172a", lineHeight: 1.15 }}>
            Things I've{" "}
            <span style={{ fontWeight: 300, color: dark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)" }}>built.</span>
          </h2>
        </RevealSection>

        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} dark={dark} index={i} />)}
        </motion.div>
      </div>
    </section>
  );
}

// ─── TIMELINE ─────────────────────────────────────────────────────────────────

function Timeline({ dark }) {
  return (
    <section id="experience" style={{ padding: "112px 24px", background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <RevealSection style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 3, height: 22, borderRadius: 2, background: dark ? "#00d9ff" : "#2563eb" }} />
            <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: "0.18em", color: dark ? "#00d9ff" : "#2563eb", fontWeight: 500 }}>Experience</span>
          </div>
          <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, letterSpacing: "-0.025em", color: dark ? "white" : "#0f172a", lineHeight: 1.15 }}>
            Where I've{" "}
            <span style={{ fontWeight: 300, color: dark ? "rgba(255,255,255,0.4)" : "rgba(15,23,42,0.4)" }}>been.</span>
          </h2>
        </RevealSection>

        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 20, top: 8, bottom: 8, width: 1, background: dark ? "rgba(255,255,255,0.06)" : "#e5e7eb" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {TIMELINE.map((item, i) => (
              <RevealSection key={i}>
                <div style={{ display: "flex", gap: 20 }}>
                  <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${item.color}12`, border: `1px solid ${item.color}35` }}>
                      {item.type === "edu" ? <GraduationCap size={16} style={{ color: item.color }} /> : <Briefcase size={16} style={{ color: item.color }} />}
                    </div>
                  </div>
                  <div style={{ flex: 1, padding: "18px 20px", borderRadius: 18, border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f3f4f6", background: dark ? "rgba(255,255,255,0.02)" : "white", boxShadow: dark ? "none" : "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: dark ? "white" : "#111827" }}>{item.title}</h3>
                        <p style={{ fontSize: 13, color: item.color, marginTop: 2 }}>{item.org}</p>
                      </div>
                      <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", padding: "4px 10px", borderRadius: 8, background: dark ? "rgba(255,255,255,0.04)" : "#f9fafb", color: dark ? "rgba(255,255,255,0.3)" : "#9ca3af", border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid #f3f4f6" }}>{item.date}</span>
                    </div>
                    <ul style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                      {item.points.map((p, j) => (
                        <li key={j} style={{ display: "flex", gap: 10, fontSize: 13, color: dark ? "rgba(255,255,255,0.45)" : "#6b7280", alignItems: "flex-start" }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 7 }} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ dark }) {
  return (
    <footer style={{ padding: "32px 24px", borderTop: dark ? "1px solid rgba(255,255,255,0.05)" : "1px solid #f3f4f6" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 13, fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.2)" : "#9ca3af" }}>© {new Date().getFullYear()} Sandipan Singh Bhullar</span>
        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.15)" : "#d1d5db" }}>Built with React + Framer Motion</span>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [dark, setDark] = useState(true);

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#080c14" : "#fafafa", color: dark ? "white" : "#111827", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,217,255,0.25); border-radius: 4px; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        a { text-decoration: none; }
        .hidden { display: none; }
        @media (min-width: 640px) { .sm\\:inline-block { display: inline-block !important; } }
        @media (min-width: 768px) { .md\\:hidden { display: none !important; } .hidden.md\\:flex { display: flex !important; } }
        @media (min-width: 1024px) { .hidden.lg\\:block { display: block !important; } .lg\\:grid-cols-2 { grid-template-columns: 1fr 1fr !important; } }
        .grid { display: grid; }
        .lg\\:grid-cols-2 { grid-template-columns: 1fr; }
        @media(min-width:1024px){.lg\\:grid-cols-2{grid-template-columns:1fr 1fr}}
      `}</style>

      <GridBackground />
      <Navbar dark={dark} setDark={setDark} />
      <main style={{ position: "relative", zIndex: 10 }}>
        <Hero dark={dark} />
        <About dark={dark} />
        <Skills dark={dark} />
        <Projects dark={dark} />
        <Timeline dark={dark} />
      </main>
      <Footer dark={dark} />
    </div>
  );
}