import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import './index.css';

const REPO = 'eshkereshek/pg_launcher';
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;

interface Asset {
  name: string;
  browser_download_url: string;
}

interface Release {
  version: string;
  publishedAt: string;
  windows?: string;
  macIntel?: string;
  macArm?: string;
  linuxDeb?: string;
}

/** Ищем ассеты по суффиксам, которые выдаёт сборка релиза. */
function pickAssets(assets: Asset[]) {
  const find = (test: (n: string) => boolean) =>
    assets.find((a) => test(a.name))?.browser_download_url;
  return {
    windows: find((n) => n.endsWith('x64-setup.exe')),
    macIntel: find((n) => n.endsWith('x64.dmg')),
    macArm: find((n) => n.endsWith('aarch64.dmg')),
    linuxDeb: find((n) => n.endsWith('amd64.deb')),
  };
}

export default function DownloadPage() {
  const [release, setRelease] = useState<Release | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      signal: ctrl.signal,
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.assets)) throw new Error('no assets');
        setRelease({
          version: String(data.tag_name || '').replace(/^v/, ''),
          publishedAt: data.published_at,
          ...pickAssets(data.assets),
        });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setFailed(true);
      });
    return () => ctrl.abort();
  }, []);

  const link = (url?: string) => url || RELEASES_PAGE;

  return (
    <SiteLayout>
      <section className="dl-hero">
        <p className="dl-eyebrow">Pagrysha Launcher</p>
        <h1 className="dl-title">Скачать лаунчер</h1>
        <p className="dl-sub">
          Установка всех версий Minecraft, модов и сборок в один клик.
        </p>
        {release && (
          <p className="dl-version">
            Версия {release.version}
            {release.publishedAt && ` · ${new Date(release.publishedAt).toLocaleDateString('ru-RU')}`}
          </p>
        )}
        {failed && (
          <p className="dl-notice">
            Не удалось получить список релизов. Откройте{' '}
            <a href={RELEASES_PAGE} target="_blank" rel="noreferrer">страницу релизов</a>.
          </p>
        )}
      </section>

      <section className="dl-grid">
        <article className="dl-card">
          <h2>Windows</h2>
          <p>Windows 10 и 11, установщик .exe</p>
          <a className="dl-btn" href={link(release?.windows)} target="_blank" rel="noreferrer">
            Скачать .exe
          </a>
        </article>

        <article className="dl-card">
          <h2>macOS · Apple Silicon</h2>
          <p>M1, M2, M3 и новее</p>
          <a className="dl-btn" href={link(release?.macArm)} target="_blank" rel="noreferrer">
            Скачать .dmg
          </a>
        </article>

        <article className="dl-card">
          <h2>macOS · Intel</h2>
          <p>Компьютеры на процессорах Intel</p>
          <a className="dl-btn" href={link(release?.macIntel)} target="_blank" rel="noreferrer">
            Скачать .dmg
          </a>
        </article>

        <article className="dl-card">
          <h2>Linux</h2>
          <p>Debian и Ubuntu, пакет .deb</p>
          <a className="dl-btn" href={link(release?.linuxDeb)} target="_blank" rel="noreferrer">
            Скачать .deb
          </a>
        </article>
      </section>

      <p className="dl-legal">
        Скачивая и используя лаунчер, вы соглашаетесь с{' '}
        <Link to="/terms">пользовательским соглашением</Link> и{' '}
        <Link to="/privacy">политикой конфиденциальности</Link>.
      </p>
    </SiteLayout>
  );
}