import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import './index.css';

const FEATURES = [
  { title: 'Удобный интерфейс', text: 'Не ищите нужную кнопку — она перед вами.' },
  { title: 'Моды без лишней возни', text: 'Pagrysha Launcher сам подберёт версии модов и зависимости.' },
  { title: 'Сборки в один клик', text: 'Популярные сборки с Modrinth устанавливаются автоматически.' },
  { title: 'Аккаунты', text: 'Ely.by, лицензия Microsoft или оффлайн-аккаунт — переключение в один клик.' },
  { title: 'Серверы', text: 'Каталог серверов и быстрое подключение к друзьям.' },
  { title: 'Тонкие настройки', text: 'Java, память, JVM-аргументы и параметры игры под себя.' },
];

const SLIDES = [
  { id: 'accounts', img: '/feature-accounts.png', title: 'Аккаунты', desc: 'Переключайтесь между Ely.by, лицензией и оффлайн-аккаунтами.' },
  { id: 'mods', img: '/feature-mods.png', title: 'Моды', desc: 'Каталог тысяч модов с автоустановкой зависимостей.' },
  { id: 'modpacks', img: '/feature-modpacks.png', title: 'Сборки', desc: 'Популярные сборки в один клик.' },
  { id: 'servers', img: '/feature-servers.png', title: 'Серверы', desc: 'Находите сервера для игры с друзьями.' },
  { id: 'settings', img: '/feature-settings.png', title: 'Настройки', desc: 'Java, выделение памяти и параметры запуска.' },
];

export default function App() {
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];

  return (
    <SiteLayout>
      <section className="home-hero">
        <p className="home-eyebrow">Minecraft launcher</p>
        <h1 className="home-title">
          Удобный <span>Minecraft</span> лаунчер
        </h1>
        <p className="home-sub">
          Все версии игры, популярные сборки модов и вход с аккаунтом Ely.by в один клик.
        </p>
        <div className="home-cta">
          <Link to="/download" className="dl-btn dl-btn-lg">Скачать лаунчер</Link>
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer" className="site-btn site-btn-ghost">
            Исходный код
          </a>
        </div>
        <img src="/hero-launcher.png" alt="Интерфейс Pagrysha Launcher" className="home-shot" />
      </section>

      <section className="home-features">
        <h2>Играйте в Minecraft с лёгкостью</h2>
        <div className="feature-grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="feature-card">
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
        <p className="home-source">
          Сборки и моды берутся с <a href="https://modrinth.com" target="_blank" rel="noreferrer">Modrinth</a>.
        </p>
      </section>

      <section className="home-gallery">
        <h2>Познакомимся поближе?</h2>
        <div className="gallery-stage">
          <img src={slide.img} alt={slide.title} key={slide.id} className="gallery-current" />
        </div>
        <div className="gallery-tabs">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              className={`gallery-tab ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-cta-band">
        <h2>Готовы играть?</h2>
        <Link to="/download" className="dl-btn dl-btn-lg">Скачать для Windows, macOS или Linux</Link>
      </section>

      <p className="home-disclaimer">
        Не официальный продукт Minecraft. Не одобрен Mojang и не связан с ними.
      </p>
    </SiteLayout>
  );
}