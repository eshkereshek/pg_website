import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Help.css';
import '../index.css';

interface FAQItem {
  id: string;
  category: 'game' | 'launcher' | 'site' | 'tech';
  question: string;
  answer: string;
  popular?: boolean;
}

const FAQ_ITEMS: FAQItem[] = [
  // --- ТЕХНИЧЕСКИЕ ВОПРОСЫ ---
  {
    id: 'ram',
    category: 'tech',
    question: 'Как выделить оперативную память для Minecraft?',
    popular: true,
    answer: 'В Pagrysha Launcher откройте раздел "Настройки", найдите ползунок "Выделение ОЗУ" и установите нужное количество памяти. Для обычной игры без модов достаточно 2–4 ГБ. Для тяжелых сборок с модами рекомендуется выделять 4–8 ГБ ОЗУ (не выделяйте более 80% от всей памяти вашего ПК).'
  },
  {
    id: 'java-error',
    category: 'tech',
    question: 'Что делать при ошибке Java или краше при запуске?',
    popular: true,
    answer: 'В 90% случаев краши возникают из-за несовместимой версии Java или конфликтующих модов. В настройках лаунчера активируйте функцию "Автовыбор Java" — лаунчер сам подберет правильную версию Java (Java 8 для старых версий 1.12.2, Java 17/21 для новейших версий 1.20.x). Если проблема сохраняется, отправьте файл latest.log из папки .minecraft в нашу поддержку.'
  },
  {
    id: 'exit-code-1',
    category: 'tech',
    question: 'Ошибка "Exit Code: 1" или "Exit Code: -1073740791" — как исправить?',
    popular: true,
    answer: 'Ошибка Exit Code 1 чаще всего указывает на конфликт установленных модов или устаревший драйвер видеокарты (NVIDIA/AMD/Intel). Обновите драйверы видеокарты с официального сайта и временно отключите моды, чтобы найти конфликтующий.'
  },
  {
    id: 'antivirus',
    category: 'tech',
    question: 'Что делать, если антивирус или Windows Defender блокирует лаунчер?',
    popular: true,
    answer: 'Pagrysha Launcher является безопасным приложением с открытым исходным кодом. Некоторые антивирусы могут давать ложные срабатывания на программы установки. Добавьте файл лаунчера в исключения вашего антивируса или Защитника Windows.'
  },
  {
    id: 'logs-find',
    category: 'tech',
    question: 'Как найти и скопировать логи ошибки (latest.log / crash-report)?',
    answer: 'Файлы логов находятся в папке игры в подпапках `.minecraft/logs/latest.log` или `.minecraft/crash-reports/`. В настройках лаунчера есть кнопка "Открыть папку игры", которая сразу приведёт в нужную директорию.'
  },

  // --- ЛАУНЧЕР ---
  {
    id: 'mods',
    category: 'launcher',
    question: 'Как установить моды в Pagrysha Launcher?',
    popular: true,
    answer: 'В Pagrysha Launcher встроен мощный менеджер модов ModViewer. Откройте вкладку "Каталог модов", выберите источник (Modrinth или CurseForge), введите название мода и нажмите "Установить". Лаунчер автоматически определит совместимость с вашей версией Minecraft (Fabric, Forge, NeoForge) и скачает все необходимые зависимые моды.'
  },
  {
    id: 'accounts',
    category: 'launcher',
    question: 'Какие типы аккаунтов поддерживаются?',
    popular: true,
    answer: 'Pagrysha Launcher поддерживает все популярные варианты входа: оффлайн-аккаунты (бесплатный никнейм без пароля), единый аккаунт системы Ely.by, а также официальные аккаунты Microsoft / Mojang. Управлять профилями и менять активный аккаунт можно в левой нижней панели лаунчера.'
  },
  {
    id: 'modpacks',
    category: 'launcher',
    question: 'Как скачивать готовые сборки модов в один клик?',
    answer: 'Перейдите во вкладку "Сборки" в боковом меню лаунчера. Вы можете искать и устанавливать популярные готовые сборки с Modrinth и CurseForge в один клик — лаунчер создаст изолированную конфигурацию со всеми модами, ресурс-паками и настройками.'
  },
  {
    id: 'game-dir',
    category: 'launcher',
    question: 'Где находятся файлы игры и папка .minecraft?',
    answer: 'Файлы Minecraft по умолчанию находятся по пути %appdata%\\.minecraft. В настройках Pagrysha Launcher вы можете нажать иконку папки рядом с полем директории игры, которая сразу приведёт в нужную директорию.'
  },
  {
    id: 'version-manager',
    category: 'launcher',
    question: 'Как переключаться между версиями игры?',
    answer: 'В нижней центральной панели лаунчера расположен удобный селектор версий. Вы можете выбрать любую официальную релизную версию Minecraft, снапшоты, а также версии с автоматически вшитыми загрузчиками Fabric, Forge, NeoForge или OptiFine.'
  },

  // --- САЙТ И АККАУНТ ---
  {
    id: 'pgsync',
    category: 'site',
    question: 'Синхронизация скинов и плащей через PG Sync',
    popular: true,
    answer: 'Чтобы другие игроки видели ваши кастомные HD-скины и плащи, просто загрузите их на сайте в разделе "Мой Аккаунт", а в игре установите мод PG Sync. Мод автоматически подтягивает текстуры с нашего сервера для всех игроков на сервере.'
  },
  {
    id: 'skin-upload',
    category: 'site',
    question: 'Как загрузить свой HD скин или плащ в личном кабинете?',
    answer: 'Авторизуйтесь на сайте, перейдите в раздел "Мой Аккаунт" и нажмите "Загрузить скин" или "Загрузить плащ". Выберите файл в формате PNG. Изменения сразу же отобразятся в системе.'
  },
  {
    id: 'skin-format',
    category: 'site',
    question: 'Какие форматы и размеры скинов поддерживаются?',
    answer: 'Поддерживаются скины стандартов 64x64, 64x32, а также HD-скины 128x128, 256x256, 512x512, 1024x1024 и плащи 64x32 / 22x17 в формате PNG.'
  },
  {
    id: 'recaptcha-help',
    category: 'site',
    question: 'Зачем нужна капча при регистрации?',
    answer: 'Капча Google reCAPTCHA защищает сервис от массовой автоматической регистрации спам-ботов. Просто отметьте галочку "Я не робот" при создании аккаунта.'
  },
  {
    id: 'privacy-data',
    category: 'site',
    question: 'Безопасны ли мои данные при регистрации на сайте?',
    answer: 'Мы храним только зашифрованный хэш вашего пароля и e-mail. Все передачи данных защищены протоколом HTTPS/SSL, а скины передаются через нашу сеть CDN.'
  },

  // --- ИГРА ---
  {
    id: 'free',
    category: 'game',
    question: 'Является ли Pagrysha Launcher бесплатным?',
    answer: 'Да! Pagrysha Launcher полностью бесплатен и имеет открытый исходный код (Open Source). Вы можете изучить код проекта в нашем репозитории на GitHub.'
  },
  {
    id: 'optifine',
    category: 'game',
    question: 'Как установить OptiFine или Sodium для высокого FPS?',
    answer: 'В меню выбора версий лаунчера выберите версию с пометкой OptiFine или Sodium, либо установите Iris/Sodium через каталог модов лаунчера в один клик.'
  },
  {
    id: 'shaders',
    category: 'game',
    question: 'Как установить шейдеры в Minecraft?',
    answer: 'Для игры с шейдерами запускайте версию с OptiFine или Iris + Sodium. Скачайте архив шейдеров (.zip) и поместите его в папку `.minecraft/shaderpacks/`, затем выберите его в настройках графики игры.'
  },
  {
    id: 'fabric-forge',
    category: 'game',
    question: 'В чем разница между Fabric, Forge и NeoForge?',
    answer: 'Forge — классический загрузчик для крупных тяжелых модов. Fabric — современный лёгкий загрузчик с высокой производительностью и быстрыми обновлениями. NeoForge — новый форк Forge для современных версий (1.20.2+).'
  },
  {
    id: 'resourcepacks',
    category: 'game',
    question: 'Как установить текстур-паки (ресурс-паки)?',
    answer: 'Поместите скачанный zip-архив с текстурами в папку `.minecraft/resourcepacks/`. В меню игры перейдите в Настройки -> Наборы ресурсов и переместите нужный пак в правый столбец.'
  }
];

export default function Help() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>('ram');

  const filteredItems = FAQ_ITEMS.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handlePopularClick = (id: string) => {
    setExpandedId(id);
    setSelectedCategory(null);
    setSearchQuery('');
    const el = document.getElementById(`faq-item-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="help-page">
      {/* Навигационная панель */}
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/newicon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <Link to="/download">Скачать</Link>
          <Link to="/help" className="active-nav">Help</Link>
          <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
          {isAuthenticated ? (
            <Link to="/profile" className="nav-btn">Мой Аккаунт</Link>
          ) : (
            <Link to="/login" className="nav-btn">Войти</Link>
          )}
        </div>
      </nav>

      {/* Верхний баннер с поиском (Центр поддержки) */}
      <div className="help-hero">
        <div className="help-hero-overlay"></div>
        <div className="help-hero-content">
          <h1>Центр поддержки</h1>
          <p className="help-hero-subtitle">Найдите ответы на любые вопросы по Pagrysha Launcher и Minecraft</p>
          
          <div className="help-search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input 
              type="text" 
              placeholder="Поиск по базе знаний (например: память, моды, Java, вылет, скины)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>
        </div>
      </div>

      {/* Популярные вопросы */}
      <div className="help-popular-section">
        <div className="help-container">
          <div className="section-label">? ПОПУЛЯРНЫЕ ВОПРОСЫ</div>
          <div className="popular-tags">
            {FAQ_ITEMS.filter(item => item.popular).map(item => (
              <button 
                key={item.id} 
                className={`popular-tag-btn ${expandedId === item.id ? 'active' : ''}`}
                onClick={() => handlePopularClick(item.id)}
              >
                <span>{item.question}</span>
                <span className="tag-arrow">›</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Категории */}
      <div className="help-categories-section">
        <div className="help-container">
          <div className="section-label">:: КАТЕГОРИИ</div>
          <div className="categories-grid">
            <div 
              className={`category-card card-game ${selectedCategory === 'game' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'game' ? null : 'game')}
            >
              <div className="category-card-header">
                <h3>ИГРА</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Станьте мастером Minecraft, настройкой шейдеров и версий</p>
            </div>

            <div 
              className={`category-card card-launcher ${selectedCategory === 'launcher' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'launcher' ? null : 'launcher')}
            >
              <div className="category-card-header">
                <h3>ЛАУНЧЕР</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Научитесь пользоваться Pagrysha Launcher, аккаунтами и модами</p>
            </div>

            <div 
              className={`category-card card-site ${selectedCategory === 'site' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'site' ? null : 'site')}
            >
              <div className="category-card-header">
                <h3>САЙТ И АККАУНТ</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Управление профилем, HD скинами и плащами PG Sync</p>
            </div>

            <div 
              className={`category-card card-tech ${selectedCategory === 'tech' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'tech' ? null : 'tech')}
            >
              <div className="category-card-header">
                <h3>ТЕХНИЧЕСКИЕ ВОПРОСЫ</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Решение вылетов, крашей, выделения памяти, Java и ошибок</p>
            </div>
          </div>
        </div>
      </div>

      {/* Список ответов на вопросы (Аккордеон) */}
      <div className="help-faq-list-section">
        <div className="help-container">
          <div className="faq-list-header">
            <h2>
              {selectedCategory 
                ? `Категория: ${selectedCategory.toUpperCase()}` 
                : searchQuery 
                ? `Результаты поиска (${filteredItems.length})` 
                : 'База знаний и частые вопросы'}
            </h2>
            {selectedCategory && (
              <button className="reset-filter-btn" onClick={() => setSelectedCategory(null)}>Сбросить фильтр ✕</button>
            )}
          </div>

          <div className="faq-accordion-list">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div 
                  key={item.id} 
                  id={`faq-item-${item.id}`}
                  className={`faq-accordion-item ${expandedId === item.id ? 'open' : ''}`}
                >
                  <button 
                    className="faq-accordion-title"
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-toggle-icon">{expandedId === item.id ? '−' : '+'}</span>
                  </button>
                  {expandedId === item.id && (
                    <div className="faq-accordion-body">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="faq-empty-state">
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить поисковый запрос или задайте вопрос в нашей поддержке.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Нижняя секция Обратной Связи (Сообщайте об ошибках) */}
      <div className="help-feedback-section">
        <div className="help-container">
          <div className="feedback-card">
            <div className="feedback-text">
              <div className="section-label">FEEDBACK</div>
              <h2>Сообщайте нам об ошибках</h2>
              <p>Помогите нам сделать Pagrysha Launcher ещё лучше — сообщите об ошибке на нашем баг-трекере GitHub или напишите в поддержку.</p>
              
              <div className="feedback-buttons">
                <a 
                  href="https://github.com/eshkereshek/pg_launcher/issues" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="nav-btn"
                >
                  Баг-трекер GitHub ›
                </a>
                <a 
                  href="mailto:pagrysha.launcher@gmail.com" 
                  className="nav-btn"
                  style={{ backgroundColor: '#4da6ff', color: '#000' }}
                >
                  Написать в Поддержку ›
                </a>
              </div>
            </div>

            <div className="feedback-image">
              <img src="/strider.gif" alt="Minecraft Strider" className="feedback-strider-gif" />
            </div>
          </div>
        </div>
      </div>

      {/* Подвал */}
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
          <Link to="/terms">Соглашение</Link> | <Link to="/privacy">Конфиденциальность</Link> | <a href="https://github.com/eshkereshek/pg_launcher" target="_blank" rel="noreferrer">GitHub</a>
        </p>
        <p style={{marginTop: '15px', fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px'}}>НЕ ОФИЦИАЛЬНЫЙ ПРОДУКТ MINECRAFT. НЕ ОДОБРЕН MOJANG И НЕ СВЯЗАН С НИМИ.</p>
      </footer>
    </div>
  );
}
