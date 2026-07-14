import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects, skills, timeline } from '../data/projectsData';

const navItems = [
  { label: '소개', id: 'intro' },
  { label: '프로젝트', id: 'projects' },
  { label: '기술 스택', id: 'skills' },
  { label: '타임라인', id: 'timeline' },
  { label: '연락', id: 'contact' },
];

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.07 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function Tag({ label, type }) {
  return <span className={`tag tag-${type}`}>{label}</span>;
}

export default function MainPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const sections = navItems
      .map(n => document.getElementById(n.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target?.id) setActiveSection(hit.target.id);
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0.1, 0.3] }
    );
    sections.forEach(s => observer.observe(s));
    return () => sections.forEach(s => observer.unobserve(s));
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pf-shell">
      <nav className="pf-nav">
        <div className="pf-nav-inner">
          <a className="pf-nav-logo" href="#intro" onClick={e => { e.preventDefault(); scrollTo('intro'); }}>
            portfolio
          </a>
          <ul className="pf-nav-links">
            {navItems.map(item => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(item.id); }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="pf-main">

        {/* ── 소개 ──────────────────────────────── */}
        <section id="intro" className="pf-section">
          <div className="pf-container">
            <FadeIn>
              <div className="hero-section">
                <div className="hero-text">
                  <span className="hero-role">Full-Stack Developer</span>
                  <h1 className="hero-name">장영재</h1>
                  <p className="hero-tagline">
                    React 기반 화면 구현에서 출발해 Spring Boot 3 풀스택, FastAPI + AI 연동,
                    Docker · Kubernetes 인프라까지 단계적으로 역량을 확장해온 개발자입니다.
                  </p>
                  <div className="hero-stack">
                    {['Spring Boot 3', 'React', 'FastAPI', 'Docker', 'Kubernetes', 'Gemini AI'].map(s => (
                      <span key={s} className="hero-stack-chip">{s}</span>
                    ))}
                  </div>
                  <div className="hero-links">
                    <a href="mailto:jyj1579@naver.com" className="link-badge">📧 jyj1579@naver.com</a>
                    <a href="https://github.com/youngjae124" target="_blank" rel="noreferrer" className="link-badge">
                      🐙 github.com/youngjae124
                    </a>
                    <span className="link-badge">📞 010-5054-2768</span>
                  </div>
                </div>
                <div className="hero-photo-wrap">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
                    alt="장영재"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 프로젝트 ──────────────────────────── */}
        <section id="projects" className="pf-section pf-section-alt">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">Projects</h2>
              <p className="section-desc">클릭하면 아키텍처, 트러블슈팅, 시연 영상을 확인할 수 있습니다.</p>
            </FadeIn>
            <div className="project-grid-53">
              {projects.map((p, i) => (
                <FadeIn key={p.id} delay={i * 70}>
                  <button className="proj-card" onClick={() => navigate(`/projects/${p.id}`)}>
                    <div className="proj-card-top">
                      <span className="proj-card-emoji">{p.emoji}</span>
                      <span className="phase-badge">{p.phase}</span>
                    </div>
                    <h3 className="proj-card-name">{p.name}</h3>
                    <p className="proj-card-desc">{p.desc}</p>
                    <div className="proj-card-foot">
                      <span className="type-badge">{p.type}</span>
                      <span className="proj-card-period">{p.period}</span>
                    </div>
                    <span className="proj-card-arrow">자세히 보기 →</span>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 기술 스택 ─────────────────────────── */}
        <section id="skills" className="pf-section">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">기술 스택</h2>
              <p className="section-desc">프로젝트에서 실제로 사용한 기술과 선택 이유를 정리했습니다.</p>
            </FadeIn>
            <div className="skill-grid">
              {skills.map((group, i) => (
                <FadeIn key={group.label} delay={i * 80}>
                  <div className="skill-group">
                    <h3 className="skill-group-title">{group.label}</h3>
                    <div className="tag-row">
                      {group.items.map(item => (
                        <Tag key={item.label} label={item.label} type={item.type} />
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 타임라인 ──────────────────────────── */}
        <section id="timeline" className="pf-section pf-section-alt">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">타임라인</h2>
              <p className="section-desc">프로젝트가 쌓일수록 구현 범위와 설계 관점이 함께 넓어졌습니다.</p>
            </FadeIn>
            <div className="timeline-grid">
              {timeline.map((item, i) => (
                <FadeIn key={item.title} delay={i * 70}>
                  <div className="timeline-card">
                    <span className="timeline-badge">{item.phase}</span>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── 연락 ──────────────────────────────── */}
        <section id="contact" className="pf-section">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">연락</h2>
              <p className="section-desc">프로젝트나 협업에 관심 있으시면 편하게 연락주세요.</p>
              <div className="contact-card">
                <div className="contact-row">
                  <span className="contact-label">Email</span>
                  <a href="mailto:jyj1579@naver.com">jyj1579@naver.com</a>
                </div>
                <div className="contact-row">
                  <span className="contact-label">Phone</span>
                  <span>010-5054-2768</span>
                </div>
                <div className="contact-row">
                  <span className="contact-label">GitHub</span>
                  <a href="https://github.com/youngjae124" target="_blank" rel="noreferrer">
                    github.com/youngjae124
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>

      <footer className="pf-footer">
        © 2025 장영재 · youngjae124.github.io/portfolio
      </footer>
    </div>
  );
}
