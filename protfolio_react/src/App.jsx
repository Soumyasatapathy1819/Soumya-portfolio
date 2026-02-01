import React, { useState, useEffect } from "react";
// Data Imports
import { contactsData } from "./contactsData"; 
import { projectsData } from "./projectsData";
import { skillsData } from "./skillsData";
import myPhoto from "./assets/my_photo.jpeg"; 
import WeTalk from "./WeTalk";
import LoadingScreen from "./LoadingScreen";
import Gallery from "./Gallery"; // Correctly imported

const Icon = ({ name }) => {
  const paths = {
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
    instagram: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01",
    linkedin: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2",
    gmail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    whatsapp: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
  };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ fill: name === 'whatsapp' ? 'currentColor' : 'none' }}>
      <path d={paths[name]} />
    </svg>
  );
};

export default function App() {
  const [text, setText] = useState("");
  const fullText = "Web Developer | Data Analyst";
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const homeElement = document.getElementById('home');
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({
      x: (e.clientX - window.innerWidth / 2) / 25,
      y: (e.clientY - window.innerHeight / 2) / 25,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "916370586308";
    const encodedMessage = encodeURIComponent(
      `*New Portfolio Message*\n\n*Name:* ${formData.name}\n*Message:* ${formData.message}`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {isLoading && <LoadingScreen isLoading={isLoading} />}
      <div onMouseMove={handleMouseMove} className="main-wrapper fade-in" onClick={closeMenu}>
        <div className="particle-container">
          {[...Array(8)].map((_, i) => <div key={i} className="particle"></div>)}
        </div>
        <div className="tech-orb" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>

        <nav onClick={(e) => e.stopPropagation()}>
          <div className="nav-container">
            <h2 className="logo-text">Soumya Prakash Satapathy</h2>
            <div className="nav-right-actions" style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
              <a href="/resume/SOUMYA_PRAKASH_SATAPATHY.pdf" download className="download-cv-btn">
                <span>Download CV</span>
                <span className="arrow-down">↓</span>
              </a>
              <button className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </button>
            </div>
            <div className={`nav-links ${isMenuOpen ? "mobile-open" : ""}`}>
              <a href="#home" onClick={closeMenu}>Home</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#skills" onClick={closeMenu}>Skills</a>
              <a href="#experience" onClick={closeMenu}>Experience</a>
              <a href="#projects" onClick={closeMenu}>Work</a>
              <a href="#gallery" onClick={closeMenu}>Gallery</a>
              <a href="#contact" className="nav-contact-btn" onClick={closeMenu}>Contact</a>
            </div>
          </div>
        </nav>

        <section id="home" className="hero">
          <div className="hero-content">
            <div className="home-badge">Let’s build something together</div>
            <h1 className="typing-header">{text}<span className="cursor">|</span></h1>
            <p className="hero-subtext">Transforming raw data into actionable insights and modern web experiences</p>
            <div className="home-btns">
              <button className="primary-btn" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>Explore Work</button>
              <button className="secondary-btn" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Let's Talk</button>
            </div>
          </div>
        </section>

        <section id="about" className="section-container">
  <h2 className="section-title">About Me</h2>
  <div className="about-content">
    <div className="about-photo-wrapper">
      <img src={myPhoto} alt="Soumya" className="about-photo" />
    </div>
    <div className="about-text-wrapper">
      <p className="about-text typing-text">
        I am a <strong>Computer Science undergraduate</strong> with a deep passion for the intersection of Data Science and Full Stack Development. My expertise lies in the full lifecycle of a digital product—from architecting robust backend systems and intuitive user interfaces to transforming complex, raw datasets into actionable insights through advanced visualization.

I thrive on bridging the gap between technical complexity and user-centric design, building scalable web applications that don't just function, but provide intelligent, data-backed solutions to real-world problems. Whether it's optimizing a database query or designing an interactive dashboard, I am committed to creating high-impact software that turns information into innovation.</p>
    </div>
  </div>
</section>

        <section id="skills" className="section-container">
          <h2 className="section-title">Skills & Certifications</h2>
          <div className="skills-grid">
            {skillsData.map((skill) => (
              <a key={skill.id} href={skill.certificateUrl} target={skill.certificateUrl !== "#" ? "_blank" : ""} rel={skill.certificateUrl !== "#" ? "noreferrer" : ""} className="skill-card" title={`View ${skill.name} Certificate`}>
                <div className="skill-content">
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-category">{skill.category}</p>
                </div>
                <span className="skill-link-icon">→</span>
              </a>
            ))}
          </div>
        </section>

        <section id="experience" className="section-container">
  <h2 className="section-title">Experience</h2>
  <div className="experience-timeline">
    
    {/* Item 1 */}
    <div className="experience-item">
      <div className="experience-header">
        <h3>Data Analytics Intern</h3>
        <span className="experience-duration">Dec 2025 – Jan 2026</span>
      </div>
      <div className="experience-company">
        Skillified Mentor | Remote 
        <a href="https://linkedin.com/..." target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
      </div>
      <div className="experience-description">
        <ul>
          <li>Analyzed structured datasets using Python (Pandas, NumPy) to derive insights related to business performance and trends.</li>
          <li>Used SQL queries for data extraction, filtering, and aggregation from relational databases.</li>
          <li>Applied Exploratory Data Analysis (EDA) techniques to uncover patterns, correlations, and outliers in datasets.</li>
        </ul>
      </div>
    </div>

    {/* Item 2 */}
    <div className="experience-item">
      <div className="experience-header">
        <h3>Data Analyst Intern</h3>
        <span className="experience-duration">May 2025 – Jun 2025</span>
      </div>
      <div className="experience-company">
        Techzex Software Pvt. Ltd. | Remote 
        <a href="https://linkedin.com/..." target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
      </div>
      <div className="experience-description">
        <ul>
          <li>Built interactive Power BI dashboards to track KPIs, sales trends, and performance metrics, enabling stakeholders tomake data-driven decisions</li>
          <li>Performed data cleaning, transformation, and preprocessing using Python (Pandas) and Power Query to ensure highdata accuracy and consistency.</li>
          <li>Collaborated with cross-functional teams to understand business requirements and translated them into analyticalreports and dashboards.</li>
        </ul>
      </div>
    </div>

    {/* Item 3 */}
    <div className="experience-item">
      <div className="experience-header">
        <h3>Deputy Coordinator</h3>
        <span className="experience-duration">2025 – Present</span>
      </div>
      <div className="experience-company">
        Residence Secretary Team | XIM University
        <a href="#" className="cert-link">View Certificate</a>
      </div>
      <div className="experience-description">
        <ul>
          <li>Managed daily operations for a student body of 2500+, streamlining communication between administrationand residents.</li>
          <li>Resolved complex student grievances by implementing a structured issue-resolution framework, improvingoverall campus satisfaction.</li>
          <li>Coordinated large-scale campus events, overseeing end-to-end logistics, budgeting, and team management.</li>
        </ul>
      </div>
    </div>

    {/* Item 4 */}
    <div className="experience-item">
      <div className="experience-header">
        <h3>Event Lead</h3>
        <span className="experience-duration">2025 – Present</span>
      </div>
      <div className="experience-company">
        ACM Student Chapter | XIM University
        <a href="#" className="cert-link">View Certificate</a>
      </div>
      <div className="experience-description">
        <ul>
          <li>Spearheaded technical workshops and coding competitions, fostering a culture of continuous learning andtechnical excellence.</li>
          <li>Drove student engagement through targeted outreach, significantly increasing chapter membership and eventturnout.</li>
          <li>Collaborated with the core executive team to design and execute a strategic roadmap for the chapter’s annualtechnical calendar.</li>  
        </ul>
      </div>
    </div>

  </div> {/* Closed experience-timeline */}
</section> {/* Closed experience section */}

        <section id="projects" className="section-container">
          <h2 className="section-title">Featured Work</h2>
          <div className="grid-2">
            {projectsData.map((project) => (
              <div key={project.id} className="stat-item project-card">
                <span className="project-category">{project.category}</span>
                <div className="project-header">
                  <h3 style={{margin: '10px 0'}}>{project.title}</h3>
                  <div className="project-actions">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="project-github" title="View on GitHub">
                        <Icon name="github" />
                      </a>
                    )}
                  </div>
                </div>
                <p style={{color: 'var(--text-dim)', fontSize: '0.95rem'}}>{project.description}</p>
                <div className="tech-stack" style={{display: 'flex', gap: '8px', marginTop: '15px'}}>
                  {project.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- GALLERY COMPONENT INTEGRATION --- */}
        <Gallery />

        <section id="contact" className="section-container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Connect With Me</h2>
          <div className="social-links-container">
            {contactsData.map((contact) => (
              <a key={contact.id} href={contact.url} target="_blank" rel="noreferrer" className="social-box">
                <Icon name={contact.iconName} />
              </a>
            ))}
          </div>
          {!showForm ? (
            <button className="primary-btn" style={{ marginTop: '40px' }} onClick={() => setShowForm(true)}>Send Direct Message</button>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <textarea placeholder="Describe your project or query..." required rows="4" onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              <div className="form-btns">
                <button type="submit" className="primary-btn">Send via WhatsApp</button>
                <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          )}
        </section>

        <footer style={{padding: '60px 0', borderTop: '1px solid var(--border)', marginTop: '100px', textAlign: 'center', opacity: 0.5}}>
          © {new Date().getFullYear()} Soumya Satapathy • Built with React & Innovation
        </footer>
        <WeTalk />
      </div>
    </>
  );
}