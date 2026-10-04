import React, { useEffect, useMemo, useState, useRef } from "react";
import { createRoot } from "react-dom/client";
import heroImage from "./assets/Hero.png";
import whoImageOne from "./assets/who1.jpg";
import whoImageTwo from "./assets/who2.jpg";
import achievementImageOne from "./assets/Achivement1.png";
import achievementImageTwo from "./assets/Achivement2.png";
import P1 from "./assets/P1.png";
import P2 from "./assets/P2.png";
import P3 from "./assets/P3.png";
import A1 from "./assets/A1.jpg";
import More1 from "./assets/More1.png";
import BorderGlow from "./components/BorderGlow/BorderGlow";
import "./styles.css";

/* ============================================
   DATA
   ============================================ */

const images = {
  hero: heroImage,
  hallway: whoImageOne,
  models: whoImageTwo,
  keyboard: achievementImageOne,
  tube: achievementImageTwo,
  process: A1,
  more: More1,
};

const projects = [
  { type: "Memory Retention Tool", title: "Anchor", image: P1, github: "https://github.com/vinaykumar-hash/Anchor" },
  { type: "Netflow Analysis Tool", title: "Netflow", image: P2, github: "https://github.com/vinaykumar-hash/Netflow", link: "https://netflow-one.vercel.app/" },
  { type: "Saas", title: "Switch", image: P3, github: "https://github.com/vinaykumar-hash/Switch", link: "https://switchstyle.app" },
  { title: "More", more: true },
];

const steps = [
  ["Discover", "Understanding the problem, identifying pain points, and defining the real user need before jumping into solutions.", "25%"],
  ["Research", "Exploring existing solutions, studying what works, and identifying the gaps and flaws that can be improved.", "50%"],
  ["Architect", "Designing the structure, workflow, and user experience while planning how the entire system will function.", "75%"],
  ["Execute", "Turning the vision into a functional product with careful implementation, iteration, and refinement.", "100%"],
];

const skills = [
  { name: "React", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" /><circle cx="12" cy="12" r="1.5" /></svg> },
  { name: "Node", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg> },
  { name: "Express", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
  { name: "Firebase", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 1.5 0 3 1.5 4 1.764 1.176 2.5 2.5 2.5 4a6 6 0 1 1-12 0c0-1.5 1-3.5 2.5-4.5 0 1.5.5 2 1.5 3 .5 1 1 1.62 1 3z" /></svg> },
  { name: "Supabase", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { name: "Mongodb", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 0-5 3.5-5 8.5S10 19 12 22c2-3 5-8.5 5-13.5S12 2 12 2z" /><path d="M12 6v12" opacity="0.5" /></svg> },
  { name: "Langchain", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg> },
  { name: "Pinecone", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v8" opacity="0.5" /><path d="M8 12h8" opacity="0.5" /></svg> },
  { name: "C++", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-4v4h-4v-4H6V6h4V2h4v4h4v4z" /></svg> },
  { name: "Python", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> },
  { name: "Javascript", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8M16 17H8" /></svg> },
  { name: "Tauri", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6l-6 10h12L12 6z" /></svg> },
  { name: "Android", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 0 0-4 4v2h8V6a4 4 0 0 0-4-4z" /><rect x="5" y="9" width="14" height="10" rx="2" /><path d="M8 19v3M16 19v3" /><path d="M4 11v5M20 11v5" /></svg> },
  { name: "Figma", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2" /></svg> },
  { name: "GraphQL", logo: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5v8l-9 5-9-5V8l9-5z" /><circle cx="12" cy="12" r="3" /></svg> },
];

/* ============================================
   HOOKS
   ============================================ */

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.15 }
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);
}

/* ============================================
   TOP HEADER — Minimal centered name
   ============================================ */

function TopHeader() {
  return (
    <header className="top-header">
      <a className="header-name" href="#top">
        vinay <span className="header-bracket">&lt;choudhary&gt;</span>
      </a>
    </header>
  );
}

/* ============================================
   SIDE NAVIGATION
   ============================================ */

function SideNav() {
  return (
    <nav className="side-nav" aria-label="Section navigation">
      <a className="side-nav-link" href="#top" aria-label="Home">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
      </a>
      <a className="side-nav-link" href="#about" aria-label="About">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
      </a>
      <a className="side-nav-link" href="#projects" aria-label="Projects">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
      </a>
      <a className="side-nav-link" href="#contact" aria-label="Contact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
      </a>
    </nav>
  );
}

/* ============================================
   BOTTOM STATUS BAR
   ============================================ */

function BottomBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const formatted = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="bottom-bar">
      <div className="bottom-left">
        <span className="status-dot" />
        <span>Based in Bengaluru</span>
        <span className="separator">·</span>
        <span>Local time {formatted}</span>
      </div>
      <div className="bottom-right">
        <a href="https://github.com/vinaykumar-hash" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
        </a>
        <a href="https://www.linkedin.com/in/vinaychoudhary7525/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
        </a>
        <a href="https://leetcode.com/u/vinay_7525/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>
        </a>
        <a className="bottom-cta" href="#contact">
          let's-work-together <span>→</span>
        </a>
      </div>
    </div>
  );
}

/* ============================================
   SHARED COMPONENTS
   ============================================ */

function Button({ children, href = "#contact", light = false }) {
  return (
    <a className={`cta magnetic ${light ? "light" : ""}`} href={href}>
      <span>{children}</span>
      <i aria-hidden="true">→</i>
    </a>
  );
}

function SectionIntro({ label, count, title }) {
  return (
    <div className="section-intro" data-reveal>
      <div>
        <h2>{label}</h2>
        {count && <span className="count">{count}</span>}
      </div>
      <p>{title}</p>
    </div>
  );
}

/* ============================================
   HERO — Cinematic with floating code symbols
   ============================================ */

/* ============================================
   HERO & ABOUT SEQUENCE — Seamless scroll transition
   ============================================ */

/* ============================================
   HERO — Cinematic with floating code symbols
   ============================================ */

function Hero() {
  return (
    <section className="hero" id="top">
      {/* Floating code symbols */}
      <span className="sym sym-1" aria-hidden="true">{"{"}</span>
      <span className="sym sym-2" aria-hidden="true">#</span>
      <span className="sym sym-3" aria-hidden="true">/</span>
      <span className="sym sym-4" aria-hidden="true">&lt;&gt;</span>
      <span className="sym sym-5" aria-hidden="true">{"}"}</span>
      <span className="sym sym-6" aria-hidden="true">;</span>
      <span className="sym sym-7" aria-hidden="true">()</span>

      <div className="hero-content" data-reveal>
        {/* <span className="hero-label">HOME</span> */}
        <h1>
          Hi, I'm Vinay, a<br />
          <span className="accent">creative</span> developer
        </h1>
        <p>
          Developer, designer, and occasional hackathon survivor.
        </p>
      </div>

      {/* <div className="scroll-indicator" aria-hidden="true" /> */}
    </section>
  );
}

/* ============================================
   ABOUT ME SECTION — Standalone layout
   ============================================ */

function AboutMe() {
  return (
    <section className="about-me-section resume-layout" id="about">
      {/* Left card: About Me + User Photo */}
      <div className="resume-left-card" data-reveal>
        {/* <span className="mono">01</span> */}
        <h2>About <span className="accent">Me</span></h2>
        <div className="resume-photo-wrapper">
          <img src={images.models} alt="Vinay Choudhary portrait" className="resume-photo" />
        </div>
      </div>

      {/* Right content details */}
      <div className="resume-right-content" data-reveal>
        <div className="resume-grid-row skills-row">
          {/* Column 1 */}
          <div className="resume-col">
            <h3>Frontend</h3>
            <p className="skills-comma-list">React.js, Next.js, React Native, Tailwind CSS, HTML, CSS</p>

            <h3 className="sub-skill-header">AI / Machine Learning</h3>
            <p className="skills-comma-list">LangChain, LangGraph, OpenAI API, Gemini API, Ollama, RAG, Prompt Engineering, Vector Embeddings, LLM Fine-Tuning</p>
          </div>

          {/* Column 2 */}
          <div className="resume-col">
            <h3>Backend</h3>
            <p className="skills-comma-list">Node.js, Express.js, REST APIs, GraphQL, Django, Firebase</p>

            <h3 className="sub-skill-header">Cloud & DevOps</h3>
            <p className="skills-comma-list">Docker, Git, GitHub, Linux, Vercel, AWS</p>
          </div>

          {/* Column 3 */}
          <div className="resume-col">
            <h3>Database & Storage</h3>
            <p className="skills-comma-list">MongoDB, MySQL, PostgreSQL, Supabase, LanceDB, FAISS, Pinecone</p>

            <h3 className="sub-skill-header">Programming Languages</h3>
            <p className="skills-comma-list">C++, Python, JavaScript, TypeScript, Rust</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PROJECTS
   ============================================ */

function Projects() {
  return (
    <section className="projects" id="projects">
      <SectionIntro label="Projects" count="(6)" title="" />
      <div className="project-grid">
        {projects.map((project, index) => {
          if (project.more) {
            return (
              <article className="project-card more-project-card" key={project.title} data-reveal style={{ "--delay": `${index * 80}ms` }}>
                <a className="more-project-tile" href="#project" aria-label="See more projects">
                  <span className="more-arrow">→</span>
                  <span className="more-label">More</span>
                </a>
              </article>
            );
          }
          return (
            <article className="project-card" key={project.title} data-reveal style={{ "--delay": `${index * 80}ms` }}>
              <div className="project-media">
                {project.video ? (
                  <video src={project.video} poster={project.image} autoPlay muted loop playsInline />
                ) : (
                  <img src={project.image} alt={`${project.title} case study`} />
                )}
                <div className="project-hover-overlay">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      View
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="overlay-btn">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
              <div className="project-meta">
                <span>{project.type}</span>
              </div>
              <h3>{project.title}</h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================
   HACKATHONS
   ============================================ */

function Brands() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const wins = [
    {
      name: "Hack To Future 3.0",
      city: "Mangaluru",
      tag: "Winner",
      image: "https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/Extra/h1.jpeg",
    },
    {
      name: "I-Solve",
      city: "Bengaluru",
      tag: "Winner",
      image: "https://ogcemddocujgszusyyfy.supabase.co/storage/v1/object/public/Extra/h2.jpeg",
    },
  ];
  return (
    <section className="brands" data-reveal>
      <p>Some of my Hackathon wins</p>
      <div className="brand-strip">
        {wins.map((win, i) => (
          <BorderGlow
            key={win.name}
            edgeSensitivity={30}
            glowColor="140 80 60"
            backgroundColor="var(--bg-card)"
            borderRadius={16}
            glowRadius={40}
            glowIntensity={1.0}
            coneSpread={25}
            animated={false}
            colors={['#4ade80', '#22c55e', '#16a34a']}
            className={`brand-cell ${hoveredIndex === i ? "is-hovered" : ""}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="brand-info">
              <span className="brand-index">0{i + 1}</span>
              <div className="brand-details">
                <strong>{win.name}</strong>
                <div className="brand-meta">
                  <span className="brand-city">{win.city}</span>
                  <span className="brand-tag">{win.tag}</span>
                </div>
              </div>
            </div>
            <div className="brand-preview">
              <img src={win.image} alt={`${win.name} hackathon`} />
            </div>
          </BorderGlow>
        ))}
      </div>
    </section>
  );
}

/* ============================================
   FLOW / APPROACH
   ============================================ */

function Flow() {
  return (
    <section className="flow" id="flow">
      <SectionIntro label="My Approach" title="" count="(7)" />
      <div className="flow-grid">
        <aside data-reveal>
          <span className="italic">"Something which I follow"</span>
        </aside>
        <div className="steps">
          {steps.map(([title, body, percent], index) => (
            <article key={title} data-reveal style={{ "--delay": `${index * 90}ms` }}>
              <div>
                <span className="step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <span>{percent}</span>
            </article>
          ))}
        </div>
        <figure data-reveal><img src={images.process} alt="Creative process board" /></figure>
      </div>
    </section>
  );
}

/* ============================================
   ABOUT MORE
   ============================================ */

function AboutMore() {
  return (
    <section className="about-more">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="74 222 128"
        backgroundColor="var(--bg-card)"
        borderRadius={16}
        glowRadius={50}
        glowIntensity={0.8}
        colors={['#4ade80', '#22c55e', '#16a34a']}
        className="about-more-card text-card has-bg-image"
        data-reveal
      >
        <div className="card-bg-image-wrapper">
          <img src={images.more} alt="One Piece illustration background" className="card-bg-image" />
          <div className="card-bg-overlay" />
        </div>

        <div className="card-foreground">
          <span className="mono">02</span>
          <h2>More about me</h2>
          <p className="hobbies-text">I Read lot of <span className="highlight-white">manga</span>, also I love to solve <span className="highlight-white">competitive programming problems</span>.</p>
          <div className="row-actions">
            <Button href="#contact">Contact Me</Button>
            <Button href="#projects" light>My work</Button>
          </div>
        </div>
      </BorderGlow>

      <BorderGlow
        edgeSensitivity={30}
        glowColor="74 222 128"
        backgroundColor="var(--bg-card)"
        borderRadius={16}
        glowRadius={50}
        glowIntensity={0.8}
        colors={['#4ade80', '#22c55e', '#16a34a']}
        className="about-more-card metric-glow-card"
        data-reveal
      >
        <div className="metric-content">
          <Counter target={600} suffix="+" />
          <span>LeetCode Problems Solved</span>
          {/* <p>Still Grinding</p> */}
        </div>
      </BorderGlow>
    </section>
  );
}

function Counter({ target, suffix }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1400, 1);
      setValue(Math.floor(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return <strong>{value}{suffix}</strong>;
}

/* ============================================
   CONTACT & FOOTER
   ============================================ */

function ContactFooter() {
  const projectsText = useMemo(() => projects.slice(0, 3).map((p) => p.title).join(" / "), []);
  return (
    <>
      <section className="contact-band" id="contact" data-reveal>
        <span>Let's work together</span>
        <h2>Contact Me</h2>
        <p>We can build greatness together💚</p>
        <Button href="mailto:vinaykumar7525@gmail.com">Send an email</Button>
      </section>
      <footer className="footer">
        <div className="footer-top">
          <h2>Vinay Choudhary</h2>
        </div>
        <div className="ticker" aria-hidden="true">
          <span>{projectsText} / {projectsText} / {projectsText}</span>
        </div>
        <div className="footer-bottom">
          <p>Bengaluru, India</p>
          <nav>
            {["Projects", "About", "Contact"].map((item) => (
              <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>
            ))}
          </nav>
          <p>© 2026 Vinay Choudhary</p>
        </div>
        <div className="social-links">
          <a href="https://github.com/vinaykumar-hash" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vinaychoudhary7525/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn
          </a>
          <a href="https://leetcode.com/u/vinay_7525/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></svg>
            LeetCode
          </a>
        </div>
      </footer>
    </>
  );
}

/* ============================================
   APP
   ============================================ */

function App() {
  useReveal();
  return (
    <>
      <TopHeader />
      <SideNav />
      <BottomBar />
      <main>
        <Hero />
        <Projects />
        <Brands />
        <AboutMe />
        {/* <Flow /> */}
        <AboutMore />
        <ContactFooter />
      </main>
    </>
  );
}

const rootEl = document.getElementById("root");
if (!window.__reactRoot) {
  window.__reactRoot = createRoot(rootEl);
}
window.__reactRoot.render(<App />);
