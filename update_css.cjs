const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const newCSS = `

/* Gallery Section */
.gallery-section {
  padding: 100px 20px;
  background-color: var(--pg-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  border-top: 1px solid var(--pg-dark3);
}

.gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.gallery-hint {
  color: #666;
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.gallery-title {
  font-size: 36px;
}

.gallery-showcase {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;
  perspective: 1200px;
}

.gallery-img {
  position: absolute;
  width: 700px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid var(--pg-dark3);
}

.gallery-img.hidden {
  opacity: 0;
  transform: scale(0.8) translateZ(-200px);
  z-index: 0;
  pointer-events: none;
}

.gallery-img.prev {
  opacity: 0.5;
  transform: translateX(-400px) scale(0.85) translateZ(-100px) rotateY(15deg);
  z-index: 1;
  filter: brightness(0.5);
}

.gallery-img.next {
  opacity: 0.5;
  transform: translateX(400px) scale(0.85) translateZ(-100px) rotateY(-15deg);
  z-index: 1;
  filter: brightness(0.5);
}

.gallery-img.active {
  opacity: 1;
  transform: translateX(0) scale(1) translateZ(0) rotateY(0);
  z-index: 2;
  filter: brightness(1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(255, 122, 0, 0.1);
}

.gallery-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  max-width: 1000px;
  width: 100%;
}

.gallery-tab {
  background-color: var(--pg-dark);
  border: 1px solid var(--pg-dark3);
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  transition: all 0.2s;
}

.gallery-tab:hover {
  background-color: #252525;
  border-color: #444;
}

.gallery-tab.active {
  border-color: var(--pg-primary);
  background-color: rgba(255, 122, 0, 0.05);
}

.tab-icon {
  font-size: 20px;
}

.tab-text {
  font-size: 13px;
  color: #999;
  line-height: 1.4;
}

.tab-text strong {
  color: white;
}

@media (max-width: 900px) {
  .gallery-img { width: 90%; }
  .gallery-img.prev, .gallery-img.next { display: none; }
  .gallery-tabs { grid-template-columns: 1fr; }
}
`;

fs.writeFileSync('src/index.css', css + newCSS, 'utf8');
