import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const projects = [
  {
    name: 'Credit Card Fraud Classifier',
    eyebrow: 'Machine Learning · USC EE 559',
    description: 'Built a fraud-detection pipeline over 284,807 transactions using NumPy-only implementations, emphasizing class imbalance, decision thresholds, and F1 optimization.',
    detail: 'Best logistic-regression F1 ≈ 0.736 with a tuned decision threshold.',
    tech: ['Python', 'NumPy', 'ML', 'Evaluation'],
    href: 'https://github.com/ArenAshikian/EE559-Final-Project',
    featured: true,
  },
  {
    name: 'Smart Aquarium Monitoring',
    eyebrow: 'IoT · Mobile · Embedded',
    description: 'A Raspberry Pi–based monitoring system that tracks aquarium conditions such as temperature, pH, and dissolved-solids readings and surfaces them through a Flutter application.',
    detail: 'Hardware sensing, device integration, mobile UI, and alert-oriented monitoring in one system.',
    tech: ['Raspberry Pi', 'Flutter', 'Dart', 'Sensors'],
    href: 'https://github.com/ArenAshikian/smart-aquarium',
    featured: true,
  },
  {
    name: 'Cloud Traffic Analytics',
    eyebrow: 'Cloud Computing · USC EE 547',
    description: 'Built a cloud-hosted traffic-analysis application around FastAPI, Vite, PostgreSQL, and YOLOv8n, with deployment work on AWS infrastructure.',
    detail: 'Combined computer vision, API design, frontend delivery, persistence, and cloud deployment.',
    tech: ['FastAPI', 'Vite', 'PostgreSQL', 'YOLOv8', 'AWS'],
    href: 'https://github.com/ArenAshikian/EE547_HW6',
    featured: true,
  },
  {
    name: 'Instagram Comment Automation',
    eyebrow: 'Production Backend · Business Automation',
    description: 'Designed a security-focused workflow for a jewelry business that maps Instagram media to product data and sends an official private reply when the exact trigger keyword is received.',
    detail: 'Designed around webhook verification, idempotency, kill switches, validation, and least-privilege access.',
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'Meta API', 'Google Sheets'],
    href: null,
    featured: true,
  },
  {
    name: 'GitHub Glance',
    eyebrow: 'Developer Tool',
    description: 'A developer-facing project for presenting GitHub information in a concise, useful interface.',
    detail: 'One of the projects carried forward from the original portfolio.',
    tech: ['Web', 'APIs', 'UX'],
    href: 'https://github.com/ArenAshikian/Github-Glance',
  },
  {
    name: 'LED Educational ChatBot',
    eyebrow: 'AI · Full Stack',
    description: 'Educational chatbot with a React frontend, Flask backend, Dockerized environment, and OpenAI API integration.',
    detail: 'Built as a complete interactive AI product rather than a notebook demo.',
    tech: ['React', 'Flask', 'Docker', 'OpenAI API'],
    href: 'https://github.com/ArenAshikian/LED-Educational-ChatBot',
  },
  {
    name: 'Klassicle',
    eyebrow: 'Full Stack · Team Project',
    description: 'A student platform for sharing class experiences and rating professors, built with a five-person team using an iterative Scrum workflow.',
    detail: 'Included SQL-backed application development and project coordination through Jira.',
    tech: ['Python', 'Flask', 'SQLAlchemy', 'HTML/CSS'],
    href: 'https://github.com/ArenAshikian/Klassicle',
  },
  {
    name: 'Dog Breed Predictor',
    eyebrow: 'Computer Vision',
    description: 'Machine-learning project focused on visual classification of dog breeds.',
    detail: 'Part of an expanding ML portfolio spanning classification, feature learning, and applied computer vision.',
    tech: ['Python', 'ML', 'Computer Vision'],
    href: 'https://github.com/ArenAshikian/Dog-Breed-Predictor',
  },
  {
    name: 'DiamondModel',
    eyebrow: 'Applied ML · Domain Modeling',
    description: 'A machine-learning project applying modeling techniques to diamond-related data.',
    detail: 'Connects technical work with firsthand familiarity with the jewelry domain.',
    tech: ['Python', 'Data', 'Machine Learning'],
    href: 'https://github.com/ArenAshikian/DiamondModel',
  },
];

const skills = {
  'Languages': ['Python', 'JavaScript', 'Java', 'C++', 'Dart', 'Swift', 'SQL', 'HTML', 'CSS'],
  'ML & Data': ['NumPy', 'scikit-learn concepts', 'classification', 'model evaluation', 'feature engineering', 'computer vision'],
  'Web & Backend': ['React', 'Vite', 'FastAPI', 'Flask', 'SQLAlchemy', 'REST APIs', 'PostgreSQL'],
  'Cloud & Tools': ['AWS', 'Docker', 'GitHub Actions', 'Git', 'Linux', 'Google Cloud concepts', 'Supabase'],
  'Mobile & Hardware': ['Flutter', 'Android', 'Raspberry Pi', 'Arduino', 'sensor integration'],
};

const education = [
  ['2024 — 2026', 'University of Southern California', 'M.S. Electrical & Computer Engineering', 'Machine Learning & Data Science · Expected Dec 2026'],
  ['2022 — 2024', 'California State University, Fullerton', 'B.S. Computer Science', 'Completed Dec 2024 · GPA 3.75 · Algorithms, operating systems, data structures, computer architecture, cybersecurity'],
  ['2020 — 2022', 'Irvine Valley College', 'A.S. Natural Sciences', 'Dean’s List · CodePath leadership experience'],
];

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);
  return [theme, setTheme];
}

function App() {
  const [theme, setTheme] = useTheme();
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const filters = ['All', 'ML', 'Cloud', 'Full Stack', 'Mobile'];
  const visible = useMemo(() => {
    if (filter === 'All') return projects;
    const token = filter.toLowerCase();
    return projects.filter(p => `${p.eyebrow} ${p.description} ${p.tech.join(' ')}`.toLowerCase().includes(token));
  }, [filter]);

  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      nodes.forEach(n => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    }), { threshold: 0.12 });
    nodes.forEach(n => io.observe(n));
    return () => io.disconnect();
  }, []);

  const nav = ['work', 'about', 'education', 'skills', 'contact'];
  return (
    <>
      <div className="progress" aria-hidden="true"><span /></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Aren Ashikian home"><span>AA</span><b>Aren Ashikian</b></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>Menu</button>
        <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Primary navigation">
          {nav.map(item => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <button className="theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">{theme === 'dark' ? 'Light' : 'Dark'}</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-shell">
          <div className="hero-kicker">SOFTWARE ENGINEER · ML / DATA · SOUTHERN CALIFORNIA</div>
          <h1>I build software that has to <em>work</em>, not just demo well.</h1>
          <div className="hero-bottom">
            <p>I’m Aren Ashikian, a software engineer finishing an M.S. in Electrical & Computer Engineering at USC with a Machine Learning & Data Science concentration. My work spans full-stack products, applied ML, cloud systems, mobile apps, and hardware-connected software.</p>
            <div className="hero-actions">
              <a className="button primary" href="#work">See selected work</a>
              <a className="button text" href="https://github.com/ArenAshikian" target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
          </div>
          <div className="signal-grid" aria-hidden="true">
            {Array.from({length: 42}).map((_,i)=><i key={i} style={{'--delay':`${(i%7)*70}ms`}} />)}
          </div>
        </section>

        <section id="work" className="section-shell block" data-reveal>
          <div className="section-head"><span>01 / Selected work</span><p>Projects chosen for technical range, not repository count.</p></div>
          <div className="filters" role="group" aria-label="Project filters">{filters.map(f => <button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div>
          <div className="project-grid">
            {visible.map((p, idx) => (
              <article className={p.featured ? 'project featured' : 'project'} key={p.name}>
                <div className="project-index">{String(idx+1).padStart(2,'0')}</div>
                <div>
                  <div className="eyebrow">{p.eyebrow}</div>
                  <h2>{p.name}</h2>
                  <p>{p.description}</p>
                  <p className="detail">{p.detail}</p>
                  <div className="tech">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
                </div>
                {p.href ? <a href={p.href} target="_blank" rel="noreferrer" aria-label={`Open ${p.name} on GitHub`}>View ↗</a> : <span className="private-project">Private repository</span>}
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section-shell split block" data-reveal>
          <div className="section-head"><span>02 / About</span></div>
          <div className="about-copy">
            <h2>Engineering across layers.</h2>
            <p>I like projects where software touches something real: a sensor, a business process, a cloud deployment, a dataset large enough to expose bad assumptions, or an interface someone actually has to use.</p>
            <p>My academic work at USC has pushed deeper into machine learning, databases, and cloud computing while my earlier work covered mobile development, web applications, teaching, and hardware. That mix has made me comfortable moving between implementation details and the broader system.</p>
            <div className="principles"><span>Practical over performative.</span><span>Measure before optimizing.</span><span>Security is a feature.</span><span>Interfaces should explain themselves.</span></div>
          </div>
        </section>

        <section className="section-shell block proof" data-reveal>
          <div className="proof-item"><strong>284,807</strong><span>transactions in fraud-classification work</span></div>
          <div className="proof-item"><strong>1.30M</strong><span>parameters in an autoencoder training project</span></div>
          <div className="proof-item"><strong>10+</strong><span>students taught in Android development</span></div>
          <div className="proof-item"><strong>2 + 1</strong><span>completed degrees plus an M.S. in progress at USC</span></div>
        </section>

        <section id="education" className="section-shell block" data-reveal>
          <div className="section-head"><span>03 / Education</span><p>Computer science foundation, then deeper specialization in ML, data, and systems.</p></div>
          <div className="timeline">{education.map(([year,school,degree,note])=><article key={school}><time>{year}</time><div><h3>{school}</h3><strong>{degree}</strong><p>{note}</p></div></article>)}</div>
          <div className="course-strip"><b>USC focus:</b><span>Machine Learning I</span><span>Database Systems</span><span>Applied & Cloud Computing</span><span>Machine Learning / Data Science</span></div>
        </section>

        <section id="skills" className="section-shell block" data-reveal>
          <div className="section-head"><span>04 / Toolkit</span><p>No fake proficiency percentages. Just tools I’ve actually used or studied.</p></div>
          <div className="skills-grid">{Object.entries(skills).map(([group,items])=><div className="skill-group" key={group}><h3>{group}</h3>{items.map(item=><span key={item}>{item}</span>)}</div>)}</div>
        </section>

        <section className="section-shell block experience" data-reveal>
          <div className="section-head"><span>05 / Earlier experience</span></div>
          <article><time>2022</time><div><h3>Android Mobile Development Tech Fellow · CodePath</h3><p>Led an Android development course at Irvine Valley College for 10+ students, teaching programming fundamentals, UI design, navigation, backend integration, third-party APIs, and GitHub collaboration.</p></div></article>
          <article><time>2019</time><div><h3>Summer Academy Intern · Tustin Public Schools Foundation</h3><p>Introduced students to Lua programming through an educational Minecraft environment and helped students design and create 3D-printable objects.</p></div></article>
        </section>

        <section id="contact" className="section-shell contact block" data-reveal>
          <div className="contact-mark">LET’S BUILD SOMETHING USEFUL.</div>
          <h2>Open to software, ML/data, cloud, and systems engineering opportunities.</h2>
          <p>Based in Southern California. Available for software engineering, ML/data, cloud, and systems conversations.</p>
          <div className="contact-actions">
            <a className="button primary" href="mailto:ashikianaren@gmail.com">ashikianaren@gmail.com</a>
            <a className="button text" href="https://www.linkedin.com/in/arenash" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a className="button text" href="https://github.com/ArenAshikian" target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} Aren Ashikian</span><span>Designed & built with React + Vite.</span></footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
