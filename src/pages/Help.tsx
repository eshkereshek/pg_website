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
  {
    id: 'ram',
    category: 'tech',
    question: 'Как выделить оперативную память для Minecraft?',
    popular: true,
    answer: 'В Pagrysha Launcher откройте раздел "Настройки", найдите ползунок "Выделение ОЗУ" и установите нужное количество памяти. Для сборки с модами рекомендуется выделять от 4 ГБ до 8 ГБ ОЗУ (не выделяйте более 80% от всей оперативной памяти вашего ПК).'
  },
  {
    id: 'mods',
    category: 'launcher',
    question: 'Как установить моды в Pagrysha Launcher?',
    popular: true,
    answer: 'Откройте встроенную вкладку "Моды" или "Сборки" прямо в лаунчере, найдите нужный мод через поиск и нажмите кнопку "Установить". Лаунчер автоматически загрузит мод и все необходимые зависимости (Fabric API, Forge и т.д.).'
  },
  {
    id: 'pgsync',
    category: 'site',
    question: 'Синхронизация скинов и плащей через PG Sync',
    popular: true,
    answer: 'Чтобы другие игроки видели ваши кастомные HD-скины и плащи, просто загрузите их на сайте в разделе "Мой Аккаунт", а в игре установите мод PG Sync (он автоматически подтягивает текстуры с нашего сервера для всех игроков на сервере).'
  },
  {
    id: 'java-error',
    category: 'tech',
    question: 'Что делать при ошибке Java или краше при запуске?',
    popular: true,
    answer: 'В 90% случаев краши возникают из-за несовместимой версии Java или конфликтующих модов. В настройках лаунчера выберите "Автовыбор Java" или сбросьте список модов. Если проблема сохраняется, прикрепите файл log из папки .minecraft на наш баг-трекер GitHub.'
  },
  {
    id: 'accounts',
    category: 'launcher',
    question: 'Какие типы аккаунтов поддерживаются?',
    popular: true,
    answer: 'Pagrysha Launcher поддерживает оффлайн-аккаунты (без интернета), аккаунты системы Ely.by, а также официальные аккаунты Microsoft/Mojang. Переключаться между ними можно в один клик прямо на главном экране лаунчера.'
  },
  {
    id: 'free',
    category: 'game',
    question: 'Является ли Pagrysha Launcher бесплатным?',
    answer: 'Да! Pagrysha Launcher полностью бесплатен и имеет открытый исходный код (Open Source). Вы можете изучить исходный код проекта на нашем GitHub.'
  },
  {
    id: 'optifine',
    category: 'game',
    question: 'Как установить OptiFine или Sodium для ускорения игры?',
    answer: 'В меню выбора версий выберите версию с пометкой OptiFine или Sodium, либо установите мод Iris/Sodium через встроенный каталог модов в 1 клик.'
  },
  {
    id: 'privacy-data',
    category: 'site',
    question: 'Безопасны ли мои данные при регистрации на сайте?',
    answer: 'Мы храним только зашифрованный хэш вашего пароля и e-mail. Все передачи данных защищены HTTPS/SSL, а скины хранятся в нашей высокоскоростной сети распространения контента CDN.'
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
              placeholder="Поиск по базе знаний (например: память, моды, Java)..." 
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
              <p>Станьте мастером Minecraft и настройкой версий</p>
            </div>

            <div 
              className={`category-card card-launcher ${selectedCategory === 'launcher' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'launcher' ? null : 'launcher')}
            >
              <div className="category-card-header">
                <h3>ЛАУНЧЕР</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Научитесь пользоваться Pagrysha Launcher и модами</p>
            </div>

            <div 
              className={`category-card card-site ${selectedCategory === 'site' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'site' ? null : 'site')}
            >
              <div className="category-card-header">
                <h3>САЙТ И АККАУНТ</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Управление профилем, скинами и плащами PG Sync</p>
            </div>

            <div 
              className={`category-card card-tech ${selectedCategory === 'tech' ? 'active' : ''}`}
              onClick={() => setSelectedCategory(selectedCategory === 'tech' ? null : 'tech')}
            >
              <div className="category-card-header">
                <h3>ТЕХНИЧЕСКИЕ ВОПРОСЫ</h3>
                <span className="cat-arrow">›</span>
              </div>
              <p>Решение вылетов, памяти, Java и редких ошибок</p>
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
              <img src="/head.png" alt="Minecraft Support" />
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
