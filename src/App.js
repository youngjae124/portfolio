import { useEffect, useState } from 'react';
import './App.css';

const navItems = [
  { label: '소개', href: '#intro', id: 'intro' },
  { label: '기술', href: '#skills', id: 'skills' },
  { label: '아카이빙', href: '#archiving', id: 'archiving' },
  { label: '프로젝트', href: '#projects', id: 'projects' },
  { label: '타임라인', href: '#timeline', id: 'timeline' },
  { label: '연락', href: '#contact', id: 'contact' },
];

const quickFacts = [
  { label: '포지션', value: 'Full-Stack Developer' },
  { label: '프로젝트', value: 'Team + Personal' },
  { label: '중점', value: 'Flow / Structure / Growth' },
];

const aboutItems = [
  { label: '한 줄 소개', value: '사용자 흐름과 구조 설계를 함께 고민하는 개발자' },
  { label: '관심사', value: 'React 기반 UI, 멀티서비스 아키텍처, AI 연동 서비스' },
  { label: '강점', value: '화면 구현에서 출발해 풀스택 설계·AI 연동·클라우드 배포까지 확장한 경험' },
  { label: 'GitHub', value: 'github.com/youngjae124', href: 'https://github.com/youngjae124' },
];

const skillGroups = [
  {
    title: 'Frontend',
    items: ['React', 'JavaScript', 'React Router DOM', 'React Redux', 'Redux Toolkit', 'Axios', 'Bootstrap', 'Sass'],
  },
  {
    title: 'Backend',
    items: ['Java 17', 'Spring Boot 3', 'Spring Security', 'Spring MVC', 'Spring JDBC', 'MyBatis', 'FastAPI', 'Python', 'numpy', 'pandas', 'scikit-learn', 'JSP', 'JSTL', 'JWT', 'Swagger UI'],
  },
  {
    title: 'Database & Infra',
    items: ['PostgreSQL', 'Oracle DB', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Google Calendar API', 'Gemini AI', 'LLM', 'VLM'],
  },
];

const archivingItems = [
  {
    title: 'GitHub',
    subtitle: '프로젝트 소스 코드와 학습 기록을 정리한 메인 아카이브',
    description: '팀 프로젝트 2개와 개인 포트폴리오 프로젝트를 포함한 저장소를 한곳에서 확인할 수 있습니다.',
    href: 'https://github.com/youngjae124',
    action: '프로필 보기',
  },
  {
    title: 'Project Repositories',
    subtitle: 'undefined / LocalQuest / battery-mes',
    description: '각 프로젝트별 구현 방향과 사용 기술, 구조를 저장소 단위로 확인할 수 있습니다.',
    href: 'https://github.com/youngjae124?tab=repositories',
    action: '저장소 목록 보기',
  },
];

const projects = [
  {
    phase: '개인 프로젝트',
    name: 'battery-mes',
    type: 'Full-Stack MES + AI',
    repoUrl: 'https://github.com/youngjae124/battery-mes',
    videoSrc: '/videos/battery-mes-demo.mp4',
    summary: '이차전지 제조 실행 시스템(MES) + 품질관리(QMS) — Spring Boot 3 · React 19 · FastAPI · Gemini AI 풀스택',
    stack: ['Java 17', 'Spring Boot 3', 'Spring Security', 'MyBatis', 'React 19', 'FastAPI', 'Python', 'numpy', 'pandas', 'scikit-learn', 'PostgreSQL', 'Gemini AI', 'LLM', 'VLM', 'Swagger UI', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'JWT'],
    contributions: [
      'Spring Boot 3 기반 14개 도메인 REST API와 JWT 인증·역할 기반 접근 제어(ADMIN/OPERATOR/INSPECTOR)를 직접 설계·구현했습니다.',
      'FastAPI Python 서비스와 Gemini AI를 연동해 SPC 분석, 보고서 자동 요약, 불량 원인 분석, VLM 이미지 분석 4종의 AI 기능을 개발했습니다.',
      'Docker Compose 풀스택 배포·Kubernetes 매니페스트·GitHub Actions CI 파이프라인까지 인프라 전 과정을 직접 구성했습니다.',
    ],
    takeaway: '멀티서비스 아키텍처, AI 연동, 클라우드 배포까지 혼자 설계하고 구축하며 풀스택 개발 전반을 종합한 프로젝트였습니다.',
  },
  {
    phase: '팀 프로젝트',
    name: 'undefined',
    type: 'Collaboration Platform',
    repoUrl: 'https://github.com/youngjae124/undefined',
    videoSrc: '/videos/undefined-demo.mp4',
    summary: '업무, 게시판, 일정 연동을 통합한 협업형 그룹웨어 웹 애플리케이션',
    stack: ['Java 11', 'Spring MVC', 'Spring JDBC', 'MyBatis', 'Oracle DB', 'JSP', 'JSTL', 'JWT', 'Google Calendar API'],
    contributions: [
      '프로젝트, 업무, 이슈, 게시판, 알림 구조를 분리해 협업 도메인을 설계했습니다.',
      'DAO, Service, Mapper 구조를 기반으로 역할을 나누며 백엔드 계층을 경험했습니다.',
      'Google Calendar 연동을 통해 내부 업무 데이터를 외부 일정 도구와 연결했습니다.',
    ],
    takeaway: '데이터 모델과 서비스 계층을 함께 바라보며 구조 설계 관점을 확장한 프로젝트였습니다.',
  },
  {
    phase: '팀 프로젝트',
    name: 'LocalQuest',
    type: 'Scalable Architecture',
    repoUrl: 'https://github.com/youngjae124/LocalQuest',
    videoSrc: '/videos/localquest-demo.mp4',
    summary: '프론트엔드와 백엔드를 분리해 확장 가능한 구조를 준비한 서비스 프로젝트',
    stack: ['React', 'JavaScript', 'React Router DOM', 'React Redux', 'Redux Toolkit', 'Axios', 'Sass', 'Spring MVC', 'Spring JDBC', 'MyBatis', 'Oracle DB', 'JWT'],
    contributions: [
      '프론트엔드에서는 상태 관리와 API 연결을 고려한 구조를 먼저 준비했습니다.',
      '백엔드는 파일 처리, 인증, 유효성 검증을 고려한 확장 가능한 기반을 구성했습니다.',
      '초기부터 화면과 서버 역할을 분리하며 구조 중심으로 프로젝트를 설계했습니다.',
    ],
    takeaway: '구현 속도보다도 이후 기능 확장을 버틸 수 있는 구조 설계의 중요성을 배웠습니다.',
  },
  
];

const timeline = [
  {
    phase: '1차 팀',
    title: 'undefined',
    description: '협업 도메인과 백엔드 계층 구조를 다루며 서비스 전체 시야를 넓혔습니다.',
  },
  {
    phase: '2차 팀',
    title: 'LocalQuest',
    description: '프론트와 백엔드 분리, 인증, DB 구조를 고려하며 확장 가능한 설계를 시작했습니다.',
  },
  {
    phase: '개인',
    title: 'battery-mes',
    description: '멀티서비스 아키텍처, AI 연동, Docker/K8s 인프라까지 직접 구성하며 풀스택 역량을 종합했습니다.',
  },
];

function App() {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-shell">
      <main className="portfolio-page">
        <header className="topbar">
          <p className="brand-mark">Portfolio</p>
          <nav className="topnav" aria-label="Portfolio sections">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <section className="hero-section" id="intro">
          <div className="hero-copy">
            <p className="eyebrow">PORTFOLIO</p>
            <h1>사용자 흐름과 서비스 구조를 함께 고민하며 성장해온 프로젝트 기록</h1>
            <p className="hero-description">
              React 기반 화면 구현에서 출발해 Spring MVC 협업 서비스, 분리형 아키텍처를 거쳐
              Spring Boot 3 · FastAPI · Gemini AI를 통합한 풀스택 MES 시스템까지
              단계적으로 역량을 확장한 포트폴리오입니다.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="primary-link">
                프로젝트 보기
              </a>
              <a href="#archiving" className="secondary-link">
                GitHub 보기
              </a>
            </div>
          </div>

          <div className="hero-panel">
            {quickFacts.map((item) => (
              <article className="fact-card" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">ABOUT</p>
            <h2>프로젝트를 통해 프론트엔드·백엔드·AI 연동·클라우드 배포까지 함께 보는 시야를 키웠습니다.</h2>
          </div>
          <div className="about-grid">
            {aboutItems.map((item) => (
              <article className="about-card" key={item.label}>
                <span>{item.label}</span>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.value}
                  </a>
                ) : (
                  <p>{item.value}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">SKILLS</p>
            <h2>프로젝트에서 실제로 사용한 기술을 기준으로 정리했습니다.</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <h3>{group.title}</h3>
                <div className="stack-list">
                  {group.items.map((item) => (
                    <span className="stack-chip" key={`${group.title}-${item}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="archiving-section" id="archiving">
          <div className="section-heading">
            <p className="eyebrow">ARCHIVING</p>
            <h2>프로젝트 결과물과 코드 기록을 GitHub 중심으로 정리했습니다.</h2>
          </div>
          <div className="archiving-grid">
            {archivingItems.map((item) => (
              <article className="archiving-card" key={item.title}>
                <p className="archiving-title">{item.title}</p>
                <h3>{item.subtitle}</h3>
                <p>{item.description}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.action}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">PROJECTS</p>
            <h2>팀 프로젝트 2개와 개인 포트폴리오 프로젝트를 시연 영상과 함께 정리했습니다.</h2>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <div className="project-head">
                  <div>
                    <span className="project-phase">{project.phase}</span>
                    <h3>{project.name}</h3>
                    <p className="project-summary">{project.summary}</p>
                  </div>
                  <div className="project-side">
                    <span className="project-type">{project.type}</span>
                    <a href={project.repoUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>

                <div className="project-content">
                  <div className="project-media">
                    <video className="project-video" controls preload="metadata">
                      <source src={project.videoSrc} type="video/mp4" />
                      브라우저가 video 태그를 지원하지 않습니다.
                    </video>
                  </div>

                  <div className="project-details">
                    <div className="project-block">
                      <h4>기술 스택</h4>
                      <div className="stack-list">
                        {project.stack.map((item) => (
                          <span className="stack-chip" key={`${project.name}-${item}`}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-block">
                      <h4>핵심 작업</h4>
                      <ul>
                        {project.contributions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="project-note">
                      <span>배운 점</span>
                      <p>{project.takeaway}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="timeline-section" id="timeline">
          <div className="section-heading">
            <p className="eyebrow">TIMELINE</p>
            <h2>프로젝트가 진행될수록 구현 범위와 설계 관점이 함께 넓어졌습니다.</h2>
          </div>
          <div className="timeline-list">
            {timeline.map((item) => (
              <article className="timeline-card" key={item.title}>
                <span className="timeline-badge">{item.phase}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">CONTACT</p>
            <h2>프로젝트나 협업에 관심 있으시면 편하게 연락주세요.</h2>
          </div>
          <div className="contact-card">
            <p>이메일: jyj1579@naver.com</p>
            <p>연락처: 010-5054-2768</p>
            <div className="contact-link-row">
              <span>GitHub</span>
              <a href="https://github.com/youngjae124" target="_blank" rel="noreferrer">
                github.com/youngjae124
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
