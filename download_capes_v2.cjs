const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const capesDir = path.join(__dirname, 'public', 'capes');
if (!fs.existsSync(capesDir)) {
  fs.mkdirSync(capesDir, { recursive: true });
}

const players = [
  { name: 'Mojang Classic', user: 'jeb_', id: 'mojang_classic' }, 
  { name: 'Minecon 2011', user: 'Notch', id: 'minecon_2011' }, 
  { name: 'Minecon 2012', user: 'slamacow', id: 'minecon_2012' }, 
  { name: 'Minecon 2013', user: 'Dinnerbone', id: 'minecon_2013' }, 
  { name: 'OptiFine Red', user: 'sp614x', id: 'optifine_red' },
  { name: 'Migrator', user: 'Grian', id: 'migrator' } // Grian has migrator probably, or standard
];

// Or we can just use known Optifine cape textures which are raw images:
const directUrls = [
  { name: 'OptiFine Cyan', url: 'http://s.optifine.net/capes/cyan.png', id: 'optifine_cyan' },
  { name: 'OptiFine Black', url: 'http://s.optifine.net/capes/black.png', id: 'optifine_black' },
  { name: 'OptiFine Purple', url: 'http://s.optifine.net/capes/purple.png', id: 'optifine_purple' },
  { name: 'OptiFine Green', url: 'http://s.optifine.net/capes/green.png', id: 'optifine_green' },
  { name: 'OptiFine Blue', url: 'http://s.optifine.net/capes/blue.png', id: 'optifine_blue' },
  { name: 'OptiFine White', url: 'http://s.optifine.net/capes/white.png', id: 'optifine_white' },
];

const fetchJson = (url) => new Promise((resolve) => {
  https.get(url, (res) => {
    let d = '';
    res.on('data', c => d+=c);
    res.on('end', () => {
      try { resolve(JSON.parse(d)); } catch(e) { resolve(null); }
    });
  }).on('error', () => resolve(null));
});

const downloadFile = (url, dest) => new Promise((resolve) => {
  const protocol = url.startsWith('https') ? https : http;
  protocol.get(url, (res) => {
    if (res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302) {
      if (res.statusCode > 300 && res.headers.location) {
        return resolve(downloadFile(res.headers.location, dest)); // follow redirect
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => resolve(true));
    } else {
      resolve(false);
    }
  }).on('error', () => resolve(false));
});

async function run() {
  const finalCapes = [];
  
  // Download OptiFine direct URLs
  for (const cape of directUrls) {
    console.log(`Downloading ${cape.name}...`);
    const fileName = `${cape.id}.png`;
    const dest = path.join(capesDir, fileName);
    if (await downloadFile(cape.url, dest)) {
      finalCapes.push({ id: cape.id, name: cape.name, url: `/capes/${fileName}` });
    }
  }

  // Fetch players from capes.dev
  for (const cape of players) {
    console.log(`Fetching ${cape.name} from capes.dev...`);
    const data = await fetchJson(`https://api.capes.dev/load/${cape.user}`);
    if (data) {
      // Find a cape
      const provider = data.minecraft?.exists ? data.minecraft : (data.optifine?.exists ? data.optifine : null);
      if (provider && provider.imageUrl) {
        const fileName = `${cape.id}.png`;
        const dest = path.join(capesDir, fileName);
        if (await downloadFile(provider.imageUrl, dest)) {
           finalCapes.push({ id: cape.id, name: cape.name, url: `/capes/${fileName}` });
        }
      } else {
        console.log(`No cape found for ${cape.user}`);
      }
    }
  }
  
  fs.writeFileSync(path.join(capesDir, 'capes.json'), JSON.stringify(finalCapes, null, 2));
  console.log('Done!');
}
run();
