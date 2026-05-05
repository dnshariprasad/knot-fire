import fs from 'fs';
import path from 'path';

function flatten(obj, prefix = '') {
  let result = {};
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(result, flatten(obj[key], prefix + key + '.'));
    } else {
      result[prefix + key] = obj[key];
    }
  }
  return result;
}

const locales = ['en', 'te'];
const baseDir = './src/i18n/locales';

locales.forEach(lang => {
  const filePath = path.join(baseDir, lang, 'translation.json');
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const flattened = flatten(data);
    fs.writeFileSync(filePath, JSON.stringify(flattened, null, 2));
    console.log(`Flattened ${filePath}`);
  }
});
