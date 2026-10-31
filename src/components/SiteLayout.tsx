import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LINKS = [
  { to: '/download', label: 'Скачать' },
  { to: '/help', label: 'Помощь' },
];

export default function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const close = () => setOpen(false);

  return (
    <div className="site">
      <header className="site-nav">
        <Link to="/" className="site-brand" onClick={close}>
          <img src="/newicon.png" alt="" width={28} height={28} />
          <span>Pagrysha Launcher</span>
        </Link>

        <nav className="site-links">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
          ))}
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
        </nav>

        <div className="site-actions">
          {isAuthenticated ? (
            <Link to="/profile" className="site-btn">Аккаунт</Link>
          ) : (
            <Link to="/login" className="site-btn site-btn-ghost">Войти</Link>
          )}
        </div>

        <button
          className={`site-burger ${open ? 'open' : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Меню"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </header>

      {open && (
        <div className="site-mobile" onClick={close}>
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
          {isAuthenticated ? (
            <Link to="/profile">Аккаунт</Link>
          ) : (
            <Link to="/login">Войти</Link>
          )}
        </div>
      )}

      <main>{children}</main>

      <footer className="site-footer">
        <span>© 2026 Pagrysha Launcher</span>
        <nav>
          <Link to="/terms">Соглашение</Link>
          <Link to="/privacy">Конфиденциальность</Link>
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}