const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const newCSS = `

/* Download Page */
.download-page {
  background-color: var(--pg-black);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.download-warning-banner {
  background-color: var(--pg-yellow);
  color: var(--pg-black);
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 2px solid #111;
}

.download-warning-banner strong {
  font-weight: 900;
}

.download-hero {
  background-color: #222222;
  padding: 80px 20px 40px;
  display: flex;
  justify-content: center;
  border-bottom: 4px solid #111;
}

.download-hero-content {
  max-width: 1000px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 60px;
}

.download-hero-text {
  flex: 1;
}

.download-hero-text h1 {
  font-size: 42px;
  margin-bottom: 15px;
  color: white;
}

.download-hero-subtitle {
  font-size: 18px;
  color: #999;
  margin-bottom: 40px;
  line-height: 1.5;
}

.download-btn-green {
  font-family: 'Blocks', sans-serif;
  display: inline-flex;
  align-items: center;
  background-color: #0d9620;
  color: white;
  padding: 14px 24px;
  font-size: 18px;
  text-decoration: none;
  border: 3px solid #000;
  box-shadow: inset -3px -3px 0 0 #086615, inset 3px 3px 0 0 #18d130, 0 8px 0 0 #111;
  text-transform: uppercase;
  margin-bottom: 15px;
  transition: transform 0.1s, box-shadow 0.1s;
}

.download-btn-green:active {
  transform: translateY(8px);
  box-shadow: inset -3px -3px 0 0 #086615, inset 3px 3px 0 0 #18d130, 0 0 0 0 #111;
}

.download-hero-os {
  font-size: 12px;
  color: #777;
  margin-bottom: 60px;
}

.download-hero-disclaimer {
  font-size: 12px;
  color: #666;
  line-height: 1.5;
}

.download-hero-disclaimer a {
  color: #4da6ff;
  text-decoration: none;
}

.download-hero-disclaimer a:hover {
  text-decoration: underline;
}

.download-hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.download-hero-image img {
  max-width: 100%;
  height: auto;
  transform: scale(1.1);
}

.download-pixel-transition {
  height: 40px;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
}

.pixel-block {
  background-color: #222222;
  position: absolute;
  top: 0;
}

.pixel-block.p1 {
  width: 100px; height: 40px; left: 10%;
}

.pixel-block.p2 {
  width: 60px; height: 20px; left: calc(10% + 100px);
}

.pixel-block.p3 {
  width: 40px; height: 20px; left: calc(10% - 40px);
}

.download-versions {
  background-color: #f5f5f5;
  color: #333;
  padding: 60px 20px 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.download-versions h2 {
  font-size: 32px;
  margin-bottom: 40px;
  color: #111;
}

.versions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  width: 100%;
}

.version-card {
  background-color: white;
  border: 1px solid #ddd;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.version-os {
  font-family: 'Blocks', sans-serif;
  font-size: 20px;
  color: #444;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.version-btn {
  font-family: 'Blocks', sans-serif;
  display: inline-flex;
  align-items: center;
  background-color: #0d9620;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  text-decoration: none;
  border: 2px solid #000;
  box-shadow: inset -2px -2px 0 0 #086615, inset 2px 2px 0 0 #18d130, 0 4px 0 0 #111;
  text-transform: uppercase;
  margin-bottom: 15px;
  transition: transform 0.1s, box-shadow 0.1s;
  cursor: pointer;
}

.version-btn:active:not(.disabled) {
  transform: translateY(4px);
  box-shadow: inset -2px -2px 0 0 #086615, inset 2px 2px 0 0 #18d130, 0 0 0 0 #111;
}

.version-btn.disabled {
  background-color: #11571b;
  color: #88a78c;
  box-shadow: inset -2px -2px 0 0 #0a3d11, inset 2px 2px 0 0 #1b8c2a, 0 4px 0 0 #111;
  cursor: not-allowed;
}

.version-req {
  font-size: 12px;
  color: #888;
}

@media (max-width: 900px) {
  .download-hero-content {
    flex-direction: column;
    text-align: center;
  }
  .versions-grid {
    grid-template-columns: 1fr;
  }
}
`;

fs.writeFileSync('src/index.css', css + newCSS, 'utf8');
