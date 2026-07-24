import { Link } from 'react-router-dom';
import '../index.css';

export default function Privacy() {
  return (
    <div className="terms-page">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/newicon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <Link to="/">На главную</Link>
          <Link to="/download">Скачать</Link>
          <Link to="/terms">Соглашение</Link>
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </nav>

      <main className="terms-container">
        <header className="terms-header">
          <div className="terms-badge">КОНФИДЕНЦИАЛЬНОСТЬ</div>
          <h1>Политика Конфиденциальности</h1>
          <p className="terms-subtitle">
            Сетевого ресурса и приложения «Pagrysha Launcher»
          </p>
          <div className="terms-meta">
            Дата публикации и вступления в силу: 24 июля 2026 г.
          </div>
        </header>

        <div className="terms-warning-box" style={{ borderColor: 'var(--pg-yellow)', background: 'rgba(241, 196, 15, 0.1)', color: '#fff' }}>
          <strong>КРАТКО О ГЛАВНОМ:</strong> Мы не собираем ваши паспортные данные, номера телефонов или платежную информацию. Мы обрабатываем только то, что необходимо для вашей игры: никнейм, хэш пароля и загруженные скины/плащи.
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Общие положения</h2>
            <p>
              1.1. Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки, хранения и защиты информации о Пользователях сетевого ресурса и программного обеспечения «Pagrysha Launcher» (включая экосистему PG Sync).
            </p>
            <p>
              1.2. Соблюдение конфиденциальности и защита пользовательских данных является приоритетом Администрации Pagrysha Launcher.
            </p>
            <p>
              1.3. Используя Приложение, веб-сайт или регистрируя аккаунт, Пользователь выражает свое согласие с условиями настоящей Политики.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Собираемая информация</h2>
            <p>
              2.1. В рамках работы экосистемы мы собираем и обрабатываем исключительно следующие данные:
            </p>
            <ul>
              <li><strong>Учетные данные:</strong> Выбранный никнейм в игре Minecraft и зашифрованный хэш пароля. Оригинальные пароли никогда не сохраняются и не передаются в открытом виде;</li>
              <li><strong>Косметические файлы:</strong> Загружаемые Пользователем файлы скинов (`.png`) и плащей (`.png`);</li>
              <li><strong>Технические логи:</strong> Анонимные сетевые логи запросов к API (IP-адрес, время запроса, версия Приложения), используемые исключительно для защиты от DDOS-атак и злоупотреблений.</li>
            </ul>
            <p>
              2.2. Мы <strong>НЕ</strong> собираем персональные идентификационные данные реальных лиц (фамилии, имена, адреса проживания, номера телефонов, электронные почты или банковские реквизиты).
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Цели обработки данных</h2>
            <p>
              3.1. Собранная информация используется строго для следующих целей:
            </p>
            <ul>
              <li>Обеспечение аутентификации Пользователя в лаунчере и на сетевом сервере;</li>
              <li>Отображение кастомных скинов и плащей в игре Minecraft для вас и других игроков с экосистемой PG Sync;</li>
              <li>Поддержание стабильности и безопасности работы сетевых сервисов.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Хранение и раскрытие информации третьим лицам</h2>
            <p>
              4.1. Учетные данные хранятся в защищенной базе данных с применением современных алгоритмов хэширования.
            </p>
            <p>
              4.2. Файлы скинов и плащей размещаются в распределенной сети CDN (включая GitHub Assets) для обеспечения высокой скорости скачивания игровым клиентом. Загруженные файлы скинов и плащей являются публично доступными для отображения другим игрокам в игре.
            </p>
            <p>
              4.3. При использовании сторонней авторизации (Ely.by, Microsoft) данные обрабатываются в соответствии с политиками конфиденциальности данных сервисов.
            </p>
            <p>
              4.4. Мы не продаем, не передаем и не оглашаем данные Пользователей третьим лицам, за исключением случаев, прямо предусмотренных действующим законодательством.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Локальное хранилище (LocalStorage)</h2>
            <p>
              5.1. Веб-сайт и Приложение используют локальное хранилище устройства (LocalStorage / SessionStorage) для сохранения токена сессии авторизации и пользовательских настроек интерфейса.
            </p>
            <p>
              5.2. Пользователь может в любой момент очистить локальное хранилище через настройки своего браузера или выходом из аккаунта в Приложении.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Права Пользователя и Удаление Данных</h2>
            <p>
              6.1. Пользователь имеет право в любой момент запросить полное удаление своего аккаунта и связанных с ним файлов скинов/плащей.
            </p>
            <p>
              6.2. Для направления запроса на удаление данных обратитесь в поддержку через наш официальный репозиторий GitHub.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Изменение Политики Конфиденциальности</h2>
            <p>
              7.1. Администрация оставляет за собой право вносить изменения в настоящую Политику конфиденциальности в одностороннем порядке.
            </p>
            <p>
              7.2. Обновленная версия Политики вступает в силу с момента ее публикации на данной странице.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Контакты и Вопросы</h2>
            <p>
              Если у вас возникли вопросы по поводу обработки ваших данных, вы можете связаться с нами в репозитории проекта:
            </p>
            <p>
              <strong>GitHub:</strong>{' '}
              <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">
                https://github.com/eshkereshek/pg_launcher
              </a>
            </p>
          </section>
        </div>
      </main>

      <footer className="footer" style={{ position: 'relative' }}>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="download-btn" 
          style={{ position: 'absolute', right: '30px', bottom: '30px', padding: '10px 15px', fontSize: '20px' }}
          title="Наверх"
        >
          ↑
        </button>
        <p>© {new Date().getFullYear()} Pagrysha Launcher. Все права защищены. <Link to="/terms">Соглашение</Link> | <Link to="/privacy">Конфиденциальность</Link> | <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a></p>
        <p style={{marginTop: '15px', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px'}}>НЕ ОФИЦИАЛЬНЫЙ ПРОДУКТ MINECRAFT. НЕ ОДОБРЕН MOJANG И НЕ СВЯЗАН С НИМИ.</p>
      </footer>
    </div>
  );
}
