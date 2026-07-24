import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import './index.css'

const SLIDES = [
  {
    id: 'accounts',
    img: '/feature-accounts.png',
    title: 'Аккаунты',
    desc: 'Легко переключайтесь между Ely.by, лицензией и оффлайн аккаунтами.',
    iconPath: 'M6 4h12v8H6V4zm2 2v4h8V6H8zM4 14h16v6H4v-6zm2 2v2h12v-2H6z'
  },
  {
    id: 'mods',
    img: '/feature-mods.png',
    title: 'Моды',
    desc: 'Каталог из тысяч модов с автоустановкой всех зависимостей.',
    iconPath: 'M10 4h6v2h-6V4zM8 8V6h2v2H8zm-4 2V8h4v2H4zm-2 2v-2h2v2H2zm0 6H0v-6h2v6zm0 0h7v2H2v-2zM18 8h-2V6h2v2zm4 4h-4V8h2v2h2v2zm0 6v-6h2v6h-2zm0 0v2h-7v-2h7zM11 9h2v2h2v2h2v2h-4v5h-2v-5H7v-2h2v-2h2V9z'
  },
  {
    id: 'modpacks',
    img: '/feature-modpacks.png',
    title: 'Сборки',
    desc: 'Скачивайте популярные сборки в один клик.',
    iconPath: 'M4 2h14v2H4v16h2v-6h12v6h2V6h2v16H2V2h2zm4 18h8v-4H8v4zM20 6h-2V4h2v2zM6 6h9v4H6V6z'
  },
  {
    id: 'servers',
    img: '/feature-servers.png',
    title: 'Сервера',
    desc: 'Находите крутые сервера для игры с друзьями.',
    iconPath: 'M4 2h16v20H4V2zm2 2v16h12V4H6zm2 2h8v2H8V6zm0 5h8v2H8v-2zm0 5h8v2H8v-2z'
  },
  {
    id: 'settings',
    img: '/feature-settings.png',
    title: 'Настройки',
    desc: 'Тонкая настройка Java, выделения памяти и параметров запуска.',
    iconPath: 'M10 2h4v4h4v4h4v4h-4v4h-4v4h-4v-4H6v-4H2v-4h4V6h4V2zm-2 6v8h8V8H8zm2 2h4v4h-4v-4z'
  }
];

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isAuthenticated } = useAuth();

  return (
    <>
      <nav className="navbar">
        <a href="#" className="nav-brand">
          <img src="/newicon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </a>
        <div className="nav-links">
          <Link to="/download">Скачать</Link>
          <Link to="/help">Help</Link>
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
          {isAuthenticated ? (
            <Link to="/profile" className="nav-btn">Мой Аккаунт</Link>
          ) : (
            <Link to="/login" className="nav-btn">Войти</Link>
          )}
        </div>
      </nav>

      <section className="hero">
        <img src="/bg-minecraftnew.png" alt="background" className="hero-bg" />
        <div className="hero-overlay"></div>
        
        <div className="hero-title-wrapper">
          <h1 className="hero-main-title">
            <span className="hero-title-top">ТВОЙ НОВЫЙ ЛЮБИМЫЙ</span>
            <span className="hero-title-bottom">
              <span className="hero-highlight">MINECRAFT</span> ЛАУНЧЕР
            </span>
          </h1>
        </div>
        <p>Устанавливай все версии игры, популярные сборки модов и заходи с аккаунтом Ely.by в один клик. Погнали играть с друзьями!</p>
        
        <Link to="/download" className="download-btn">
          Скачать Pagrysha Launcher
        </Link>

        <img src="/hero-launcher.png" alt="Launcher Interface" className="hero-screenshot" />
      </section>

      <section id="features" className="features">
        <div className="features-header">
          <div className="features-badge">ОСОБЕННОСТИ</div>
          <h2 className="features-title">Играйте в Minecraft с лёгкостью</h2>
          <p className="features-subtitle">Не тратьте лишнее время на настройку своей игры.</p>
        </div>
        <div className="features-bento">
          <div className="bento-card">
            <h3>Приятный и удобный интерфейс</h3>
            <p>Не ищите нужную кнопку, она перед вами!</p>
          </div>
          <div className="bento-card col-span-2">
            <h3>Устали перетягивать моды между версиями?</h3>
            <p>Хорошая новость! Pagrysha Launcher сделает это за вас.</p>
          </div>
          <div className="bento-card col-span-2">
            <h3>Устанавливайте популярные сборки в один клик</h3>
            <p>Играйте только на лучших сборках с самых популярных сайтов.</p>
            <p style={{marginTop: 'auto', fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>
              Мы поддерживаем:{' '}
              <a 
                href="https://modrinth.com" 
                target="_blank" 
                rel="noreferrer" 
                className="modrinth-link"
                style={{
                  color: '#1bd96a', 
                  fontSize: '14px', 
                  textTransform: 'none', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'color 0.2s, transform 0.2s'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1bd96a">
                  <path d="M12.252 2c-5.514 0-10 4.486-10 10 0 2.223.729 4.278 1.957 5.947l.951-1.647a7.95 7.95 0 0 1-1.008-3.3c0-4.411 3.589-8 8.1-8 4.411 0 8 3.589 8 8a7.95 7.95 0 0 1-1.008 3.3l.951 1.647A9.957 9.957 0 0 0 22.252 12c0-5.514-4.486-10-10-10zm-1.854 5.09-3.708 6.42 2.766 4.79 3.708-6.42-2.766-4.79zm3.708 0-2.766 4.79 3.708 6.42 2.766-4.79-3.708-6.42z"/>
                </svg>
                Modrinth
              </a>
            </p>
          </div>
          <div className="bento-card">
            <h3>Продвинутые настройки</h3>
            <p>Используйте все возможности игры.</p>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="gallery-header">
          <p className="gallery-hint">{'<> ЛИСТАЙТЕ, ЧТОБЫ УВИДЕТЬ БОЛЬШЕ'}</p>
          <h2 className="gallery-title">Познакомимся поближе?</h2>
        </div>

        <div className="gallery-showcase">
          {SLIDES.map((slide, index) => {
            let position = 'hidden';
            if (index === activeSlide) position = 'active';
            else if (index === activeSlide - 1 || (activeSlide === 0 && index === SLIDES.length - 1)) position = 'prev';
            else if (index === activeSlide + 1 || (activeSlide === SLIDES.length - 1 && index === 0)) position = 'next';

            return (
              <img 
                key={slide.id} 
                src={slide.img} 
                alt={slide.title} 
                className={`gallery-img ${position}`}
                onClick={() => setActiveSlide(index)}
              />
            )
          })}
        </div>

        <div className="gallery-tabs">
          {SLIDES.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`gallery-tab ${activeSlide === index ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            >
              <div className="tab-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d={slide.iconPath} />
                </svg>
              </div>
              <div className="tab-text">
                <strong>{slide.title}.</strong> {slide.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="download" className="cta">
        <h2>Готов начать своё приключение?</h2>
        <Link to="/download" className="download-btn">
          Скачать для Windows
        </Link>
      </section>

      <footer className="footer" style={{ position: 'relative' }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="download-btn" 
          style={{ position: 'absolute', right: '30px', bottom: '30px', padding: '10px 15px', fontSize: '20px' }}
          title="Наверх"
        >
          ↑
        </button>
        <p>© {new Date().getFullYear()} Pagrysha Launcher. Все права защищены.</p>
        <p style={{ marginTop: '8px' }}>
          Электронная почта: <a href="mailto:pagrysha.launcher@gmail.com" style={{ color: 'var(--pg-yellow)', fontWeight: '500' }}>pagrysha.launcher@gmail.com</a>
        </p>
        <p style={{ marginTop: '8px' }}>
          <Link to="/terms">Пользовательское соглашение</Link> | <Link to="/privacy">Политика конфиденциальности</Link> | <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">Open Source на GitHub</a>
        </p>
        <p style={{marginTop: '15px', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px'}}>НЕ ОФИЦИАЛЬНЫЙ ПРОДУКТ MINECRAFT. НЕ ОДОБРЕН MOJANG И НЕ СВЯЗАН С НИМИ.</p>
      </footer>
    </>
  )
}

export default App
