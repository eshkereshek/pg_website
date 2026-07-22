const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'capes');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

https.get('https://laby.net/ru/capes', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    // Look for __NEXT_DATA__
    const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
    if (match) {
      const data = JSON.parse(match[1]);
      const capes = [];
      const foundIds = new Set();
      
      const findCapes = (obj) => {
        if (!obj) return;
        if (Array.isArray(obj)) {
          obj.forEach(findCapes);
        } else if (typeof obj === 'object') {
          // Laby.net capes typically have name and type=CAPE or cape_id
          if (obj.cape_id || (obj.type && obj.type.toLowerCase().includes('cape')) || (obj.texture && obj.texture.includes('cape'))) {
            if (!foundIds.has(JSON.stringify(obj))) {
              capes.push(obj);
              foundIds.add(JSON.stringify(obj));
            }
          }
          Object.values(obj).forEach(findCapes);
        }
      };
      
      findCapes(data);
      console.log(`Found ${capes.length} potential capes.`);
      fs.writeFileSync('capes_debug.json', JSON.stringify(capes, null, 2));
    } else {
      console.log('No NEXT_DATA found');
    }
  });
});
