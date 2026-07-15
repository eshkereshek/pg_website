const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');
const startIdx = app.indexOf('<section id="features" className="features">');
const endIdx = app.indexOf('<section id="download" className="cta">');

const newFeatures = `<section id="features" className="features">
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
            <p style={{marginTop: 'auto', fontSize: '12px', color: '#666', textTransform: 'uppercase', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px'}}>Мы поддерживаем: <span style={{color: '#1bd96a', fontSize: '14px', textTransform: 'none'}}>Modrinth</span></p>
          </div>
          <div className="bento-card">
            <h3>Продвинутые настройки</h3>
            <p>Используйте все возможности игры.</p>
          </div>
        </div>
      </section>

      `;

app = app.substring(0, startIdx) + newFeatures + app.substring(endIdx);
fs.writeFileSync('src/App.tsx', app, 'utf8');

let css = fs.readFileSync('src/index.css', 'utf8');
const cssStartIdx = css.indexOf('/* Features Section */');
const cssEndIdx = css.indexOf('/* Call to action */');

const newCSS = `/* Features Section */
.features {
  padding: 100px 20px;
  background-color: var(--pg-black);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.features-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.features-badge {
  background-color: var(--pg-yellow);
  color: var(--pg-black);
  padding: 6px 16px;
  border-radius: 6px;
  font-family: 'Blocks', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: normal;
  border: 2px solid #111;
  box-shadow: inset 0 -3px 0 0 rgba(0,0,0,0.2);
}

.features-title {
  font-size: 48px;
  margin-bottom: 15px;
  text-align: center;
}

.features-subtitle {
  font-size: 18px;
  color: var(--pg-text-muted);
  text-align: center;
}

.features-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1000px;
  width: 100%;
}

.bento-card {
  background-color: #1f1f1f;
  border: 1px solid #2a2a2a;
  border-radius: 2px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: all 0.2s;
}

.bento-card:hover {
  border-color: #444;
  background-color: #252525;
}

.bento-card.col-span-2 {
  grid-column: span 2;
}

.bento-card h3 {
  font-size: 22px;
  color: white;
  line-height: 1.3;
}

.bento-card p {
  color: #999;
  font-size: 16px;
  line-height: 1.5;
}

`;

css = css.substring(0, cssStartIdx) + newCSS + css.substring(cssEndIdx);

// Also fix responsive grid
css = css.replace('.feature-row { flex-direction: column !important; gap: 40px; }', '.features-bento { grid-template-columns: 1fr; }\n  .bento-card.col-span-2 { grid-column: span 1; }');

fs.writeFileSync('src/index.css', css, 'utf8');
