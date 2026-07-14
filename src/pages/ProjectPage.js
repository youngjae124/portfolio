import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/projectsData';

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    const el = ref.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-section${visible ? ' visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

function Tag({ label, type }) {
  return <span className={`tag tag-${type}`}>{label}</span>;
}

function ArchNodes({ nodes }) {
  return (
    <div className="arch-nodes-row">
      {nodes.map((node, j) => (
        <div key={j} className={`arch-node arch-node-${node.type}`}>
          <span className="arch-node-name">{node.name}</span>
          {node.detail && <span className="arch-node-detail">{node.detail}</span>}
        </div>
      ))}
    </div>
  );
}

function ArchDiagram({ diagram }) {
  const mainRows = diagram.filter(r => !r.isInfra && !r.isExternal);
  const infraRow = diagram.find(r => r.isInfra);
  const externalRow = diagram.find(r => r.isExternal);

  return (
    <div className="arch-diagram">
      <div className="arch-main-flow">
        {mainRows.map((row, i) => (
          <div key={i} className="arch-flow-item">
            <div className="arch-flow-row">
              <span className="arch-layer-label">{row.label}</span>
              {row.wrapper ? (
                <div className="arch-wrapper">
                  <span className="arch-wrapper-label">{row.wrapper}</span>
                  <ArchNodes nodes={row.nodes} />
                </div>
              ) : (
                <ArchNodes nodes={row.nodes} />
              )}
            </div>
            {row.connect && (
              <div className="arch-connector">
                <span className="arch-connector-line" />
                <span className="arch-connector-label">{row.connect}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      {infraRow && (
        <div className="arch-extra-row arch-infra-row">
          <span className="arch-layer-label">{infraRow.label}</span>
          <ArchNodes nodes={infraRow.nodes} />
        </div>
      )}
      {externalRow && (
        <div className="arch-extra-row arch-external-row">
          <span className="arch-layer-label">{externalRow.label}</span>
          <ArchNodes nodes={externalRow.nodes} />
        </div>
      )}
    </div>
  );
}

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === id);

  const [activeTab, setActiveTab] = useState('arch');
  const [activeTrouble, setActiveTrouble] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveTrouble(0);
    setActiveTab('arch');
  }, [id]);

  if (!project) {
    return (
      <div className="pf-shell">
        <div className="pf-container" style={{ paddingTop: 120 }}>
          <p>프로젝트를 찾을 수 없습니다.</p>
          <button className="back-btn" onClick={() => navigate('/')}>← 메인으로</button>
        </div>
      </div>
    );
  }

  const trouble = project.troubles[activeTrouble];

  return (
    <div className="pf-shell">
      <nav className="pf-nav">
        <div className="pf-nav-inner">
          <button className="pf-nav-logo" onClick={() => navigate('/')}>
            ← Portfolio
          </button>
          <ul className="pf-nav-links proj-nav-links">
            {projects.map(p => (
              <li key={p.id}>
                <button
                  className={id === p.id ? 'active' : ''}
                  onClick={() => navigate(`/projects/${p.id}`)}
                >
                  {p.emoji} {p.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="pf-main">

        {/* ── 개요 ──────────────────────────── */}
        <section className="pf-section" style={{ paddingTop: 40 }}>
          <div className="pf-container">
            <FadeIn>
              <div className="overview-card">
                <div className="overview-header">
                  <span className="overview-emoji">{project.emoji}</span>
                  <div>
                    <div className="overview-badges">
                      <span className="phase-badge">{project.phase}</span>
                      <span className="type-badge">{project.type}</span>
                    </div>
                    <h1 className="overview-name">{project.name}</h1>
                  </div>
                </div>
                <p className="overview-tagline">{project.overview}</p>
                <div className="overview-meta">
                  <span>📅 {project.period}</span>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">🐙 GitHub</a>
                  {project.repoUrl2 && (
                    <a href={project.repoUrl2} target="_blank" rel="noreferrer">🐙 GitHub 2</a>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 시연 영상 ─────────────────────── */}
        {project.videoSrc && (
          <section className="pf-section pf-section-alt">
            <div className="pf-container">
              <FadeIn>
                <h2 className="section-title">시연 영상</h2>
                <div className="video-wrap">
                  <video
                    className="project-video"
                    controls
                    preload="metadata"
                  >
                    <source
                      src={`${process.env.PUBLIC_URL}/videos/${project.videoSrc}`}
                      type="video/mp4"
                    />
                    브라우저가 video 태그를 지원하지 않습니다.
                  </video>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* ── 아키텍처 ──────────────────────── */}
        <section className={`pf-section${project.videoSrc ? '' : ' pf-section-alt'}`}>
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">아키텍처</h2>

              <div className="arch-tabs">
                <button
                  className={`arch-tab-btn${activeTab === 'arch' ? ' active' : ''}`}
                  onClick={() => setActiveTab('arch')}
                >
                  시스템 구조
                </button>
                <button
                  className={`arch-tab-btn${activeTab === 'stack' ? ' active' : ''}`}
                  onClick={() => setActiveTab('stack')}
                >
                  기술 스택
                </button>
              </div>

              {activeTab === 'arch' && (
                <div className="arch-content">
                  {project.archDiagram ? (
                    <ArchDiagram diagram={project.archDiagram} />
                  ) : (
                    <div className="arch-desc-box">
                      <p className="arch-desc">{project.architecture}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'stack' && (
                <div className="arch-content">
                  <div className="tag-row">
                    {project.stack.map(item => (
                      <Tag key={item.label} label={item.label} type={item.type} />
                    ))}
                  </div>
                  {project.techDecisions && project.techDecisions.length > 0 && (
                    <div className="tech-decisions">
                      <h3 className="tech-decisions-title">왜 이 기술을 선택했나요?</h3>
                      <div className="tech-decisions-list">
                        {project.techDecisions.map((d, i) => (
                          <div className="tech-decision-card" key={i}>
                            <span className="tech-decision-name">{d.tech}</span>
                            <p className="tech-decision-reason">{d.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* ── 담당 역할 ─────────────────────── */}
        <section className="pf-section">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">담당 역할</h2>
              <div className="contrib-list">
                {project.contributions.map((item, i) => (
                  <div className="contrib-item" key={i}>
                    <span className="contrib-num">0{i + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── 트러블슈팅 ────────────────────── */}
        <section className="pf-section pf-section-alt">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">트러블슈팅</h2>

              <div className="trouble-cards">
                {project.troubles.map((t, i) => (
                  <button
                    key={t.id}
                    className={`trouble-card${activeTrouble === i ? ' active' : ''}`}
                    onClick={() => setActiveTrouble(i)}
                  >
                    <span className="trouble-num">#{t.id.toString().padStart(2, '0')}</span>
                    <span className="trouble-title">{t.title}</span>
                    <span className="trouble-tag">{t.tag}</span>
                  </button>
                ))}
              </div>

              {trouble && (
                <div className="trouble-detail">
                  <div className="trouble-steps">
                    <div className="trouble-step step-problem">
                      <span className="step-label">🔴 문제 상황</span>
                      <p>{trouble.problem}</p>
                    </div>
                    <div className="trouble-arrow">↓</div>
                    <div className="trouble-step step-cause">
                      <span className="step-label">🟠 원인 분석</span>
                      <p>{trouble.cause}</p>
                    </div>
                    <div className="trouble-arrow">↓</div>
                    <div className="trouble-step step-solve">
                      <span className="step-label">🟢 해결 방법</span>
                      <p>{trouble.solution}</p>
                    </div>
                    <div className="trouble-arrow">↓</div>
                    <div className="trouble-step step-result">
                      <span className="step-label">🔵 결과</span>
                      <p>{trouble.result}</p>
                    </div>
                  </div>
                </div>
              )}
            </FadeIn>
          </div>
        </section>

        {/* ── 회고 ──────────────────────────── */}
        <section className="pf-section">
          <div className="pf-container">
            <FadeIn>
              <h2 className="section-title">회고</h2>
              <div className="retro-card">
                <span className="retro-icon">💡</span>
                <p className="retro-text">{project.takeaway}</p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="proj-nav-btns">
                <button className="back-btn" onClick={() => navigate('/')}>
                  ← 프로젝트 목록으로
                </button>
                <div className="proj-switch-btns">
                  {projects.map(p => (
                    <button
                      key={p.id}
                      className={`proj-switch-btn${p.id === id ? ' current' : ''}`}
                      onClick={() => navigate(`/projects/${p.id}`)}
                    >
                      {p.emoji} {p.name}
                    </button>
                  ))}
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
