const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const capesDir = path.join(__dirname, 'public', 'capes');
if (!fs.existsSync(capesDir)) {
  fs.mkdirSync(capesDir, { recursive: true });
}

const capesList = [
  { name: 'OptiFine Red', url: 'http://s.optifine.net/capes/sp614x.png', id: 'optifine_red' },
  { name: 'OptiFine Cyan', url: 'http://s.optifine.net/capes/cyan.png', id: 'optifine_cyan' },
  { name: 'OptiFine Black', url: 'http://s.optifine.net/capes/black.png', id: 'optifine_black' },
  { name: 'OptiFine Purple', url: 'http://s.optifine.net/capes/purple.png', id: 'optifine_purple' },
  { name: 'OptiFine Green', url: 'http://s.optifine.net/capes/green.png', id: 'optifine_green' },
  { name: 'Mojang Classic', url: 'https://crafatar.com/capes/853c80ef3c3749fdaa49938b674adae6', id: 'mojang_classic' }, // jeb_
  { name: 'Minecon 2011', url: 'https://crafatar.com/capes/069a79f444e94726a5befca90e38aaf5', id: 'minecon_2011' }, // Notch
  { name: 'Minecon 2012', url: 'https://crafatar.com/capes/7125ba8b1c864508b92bb5c042ccfe2b', id: 'minecon_2012' }, 
  { name: 'Minecon 2013', url: 'https://crafatar.com/capes/61699b2ed3274a019f1e0ea8c3f06bc6', id: 'minecon_2013' }, // Dinnerbone
  { name: 'Minecon 2015', url: 'https://crafatar.com/capes/5101a1c7c936441bbf847b38cc0a4f66', id: 'minecon_2015' },
  { name: 'Minecon 2016', url: 'https://crafatar.com/capes/331a986cfa2b4f91b7d5300ec2af01ba', id: 'minecon_2016' },
  { name: 'Migrator', url: 'https://crafatar.com/capes/12b48a85514b43f9a7647adcc559e2ab', id: 'migrator' },
  { name: 'Vanilla', url: 'https://crafatar.com/capes/221b212f43fb4e9eb25b6a7b7381ff2d', id: 'vanilla' },
  { name: 'Cherry', url: 'https://crafatar.com/capes/1131c9a6d9de4da9acdd2585ee588d3d', id: 'cherry' },
  { name: '15th Anniversary', url: 'https://crafatar.com/capes/00000000000000000000000000000000', id: '15_anniversary' } // Needs real uuid
];

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        console.log(`Failed to download ${url}: ${response.statusCode}`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error downloading ${url}: ${err.message}`);
      resolve(false);
    });
  });
};

async function run() {
  const finalCapes = [];
  for (const cape of capesList) {
    console.log(`Downloading ${cape.name}...`);
    const fileName = `${cape.id}.png`;
    const dest = path.join(capesDir, fileName);
    const success = await downloadFile(cape.url, dest);
    if (success) {
      finalCapes.push({
        id: cape.id,
        name: cape.name,
        url: `/capes/${fileName}`
      });
    }
  }
  fs.writeFileSync(path.join(capesDir, 'capes.json'), JSON.stringify(finalCapes, null, 2));
  console.log('Done downloading capes!');
}

run();
