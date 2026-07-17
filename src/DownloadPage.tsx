import { Link } from 'react-router-dom';
import './index.css';

function DownloadPage() {
  return (
    <div className="download-page">
      <div className="download-warning-banner">
        <strong>Внимание!</strong> Pagrysha Launcher находится в стадии активной разработки. Сообщайте нам о любых ошибках или недоработках.
      </div>

      <nav className="navbar" style={{ position: 'relative', background: 'transparent', border: 'none' }}>
        <Link to="/" className="nav-brand">
          <img src="/icon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <Link to="/">На главную</Link>
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </nav>

      <div className="download-hero">
        <div className="download-hero-content">
          <div className="download-hero-text">
            <h1>Скачать Pagrysha Launcher</h1>
            <p className="download-hero-subtitle">
              Доведенный до совершенства, удобный и простой.<br />
              Pagrysha Launcher просто лучше.
            </p>
            
            <a href="https://github.com/eshkereshek/pg_launcher/releases/latest/download/Pagrysha.Launcher.7.0.3.exe" className="download-btn-green" target="_blank" rel="noreferrer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '10px'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Скачать для Windows
            </a>
            <p className="download-hero-os">Windows 7, 8, 10, 11</p>

            <p className="download-hero-disclaimer">
              При скачивании и использовании Pagrysha Launcher, вы соглашаетесь с <a href="#">пользовательским соглашением</a> и <a href="#">политикой конфиденциальности</a>.
            </p>
          </div>
          
          <div className="download-hero-image">
            <img src="/head.png" alt="Minecraft Head" />
          </div>
        </div>
      </div>

      <div className="download-versions">
        <h2>Все версии</h2>
        
        <div className="versions-grid">
          {/* Windows */}
          <div className="version-card">
            <div className="version-os">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.801"/></svg>
              WINDOWS
            </div>
            <a href="https://github.com/eshkereshek/pg_launcher/releases/latest/download/Pagrysha.Launcher.7.0.4.exe" className="version-btn" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Скачать
            </a>
            <p className="version-req">Windows 7, 8, 10, 11</p>
          </div>

          {/* MacOS */}
          <div className="version-card">
            <div className="version-os">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.48.06 2.62.62 3.32 1.6-2.88 1.76-2.39 5.56.57 6.78-.65 1.71-1.48 3.45-2.47 4.59zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.39-1.92 4.28-3.74 4.25z"/></svg>
              MACOS
            </div>
            <button className="version-btn disabled" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Скачать
            </button>
            <p className="version-req">В разработке</p>
          </div>

          {/* Linux */}
          <div className="version-card">
            <div className="version-os">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M11.967 0c-.571 0-1.35.333-1.687.97-.611 1.155-.83 2.193-.578 3.315.228 1.01.815 1.944 1.577 2.825l-.261.272c-2.348-.163-4.887 1.346-6.195 3.335-1.127 1.714-1.574 3.655-1.275 5.753.298 2.097 1.258 4.093 2.81 5.485 1.439 1.29 3.29 1.933 5.12 1.996h1.054c1.83-.063 3.681-.706 5.12-1.996 1.552-1.392 2.512-3.388 2.81-5.485.299-2.098-.148-4.039-1.275-5.753-1.308-1.989-3.847-3.498-6.195-3.335l-.261-.272c.762-.881 1.349-1.815 1.577-2.825.252-1.122.033-2.16-.578-3.315C13.317.333 12.538 0 11.967 0zm-2.067 11.836c.928 0 1.685.762 1.685 1.696 0 .934-.757 1.696-1.685 1.696-.928 0-1.686-.762-1.686-1.696 0-.934.758-1.696 1.686-1.696zm4.186 0c.928 0 1.686.762 1.686 1.696 0 .934-.758 1.696-1.686 1.696-.928 0-1.685-.762-1.685-1.696 0-.934.757-1.696 1.685-1.696z"/></svg>
              LINUX
            </div>
            <button className="version-btn disabled" disabled>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Скачать
            </button>
            <p className="version-req">В разработке</p>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ position: 'relative', background: 'var(--pg-black)', color: '#999', borderTop: '1px solid var(--pg-dark3)' }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="download-btn-green" 
          style={{ position: 'absolute', right: '30px', bottom: '30px', padding: '10px 15px', fontSize: '20px' }}
          title="Наверх"
        >
          ↑
        </button>
        <p>© {new Date().getFullYear()} Pagrysha Launcher. Все права защищены. <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer" style={{color: '#666'}}>Open Source на GitHub</a></p>
        <p style={{marginTop: '15px', fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px'}}>НЕ ОФИЦИАЛЬНЫЙ ПРОДУКТ MINECRAFT. НЕ ОДОБРЕН MOJANG И НЕ СВЯЗАН С НИМИ.</p>
      </footer>
    </div>
  );
}

export default DownloadPage;
