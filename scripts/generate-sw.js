const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'out');
const TEMPLATE_PATH = path.join(__dirname, '..', 'public', 'sw.template.js');
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sw.js');

// جمع‌آوری تمام فایل‌ها در پوشه out
function getAllFiles(dir, basePath = '') {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.posix.join(basePath, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, relativePath));
    } else {
      // مسیر باید با / شروع شود
      files.push('/' + relativePath);
    }
  }
  return files;
}

try {
  const files = getAllFiles(OUT_DIR);
  // افزودن ریشه (index.html خروجی می‌دهد "/index.html" که همان "/" معادلش است. می‌توانیم "/" را هم بگذاریم)
  if (!files.includes('/index.html')) {
    files.push('/index.html');
  }
  // برای اطمینان "/" رو هم داریم
  if (!files.includes('/')) {
    files.push('/');
  }

  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const urlsArray = JSON.stringify(files);
  const swContent = template.replace('__PRECACHE_URLS__', urlsArray);
  fs.writeFileSync(OUTPUT_PATH, swContent, 'utf8');
  console.log('Service worker generated with', files.length, 'files.');
} catch (err) {
  console.error('Error generating sw:', err.message);
  process.exit(1);
}
