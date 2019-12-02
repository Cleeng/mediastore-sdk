const glob = require('glob');
const fs = require('fs');
const { writeFile, makeDir } = require('./fs');

function mapFilesByLng(files) {
  const concat = {};
  files.forEach(file => {
    const regex = /([a-zA-Z0-9]+)\/translations\/([a-zA-Z]+)\/([a-zA-Z_-]+).json/gm;
    const fileParams = regex.exec(file);
    const lng = fileParams[2];
    const tmpChild = {
      file: fileParams[0],
      lng: fileParams[2],
      ns: fileParams[3]
    };
    if (Array.isArray(concat[lng])) {
      concat[lng].push(tmpChild);
    } else {
      concat[lng] = [tmpChild];
    }
  });
  return concat;
}

module.exports.run = function(build) {
  const localePath = build ? 'build/' : 'public/';
  return new Promise((resolve, reject) => {
    glob('./src/translations/*/*.json', async (err, files) => {
      const concat = mapFilesByLng(files);
      Object.keys(concat).forEach(async key => {
        try {
          await makeDir(`./${localePath}locales/${key}`);
          const translations = concat[key].reduce((acc, arr) => {
            const jsonContent = fs.readFileSync(arr.file);
            return { ...acc, ...JSON.parse(jsonContent) };
          }, {});
          await writeFile(
            `./${localePath}locales/${key}/translations.json`,
            JSON.stringify(translations)
          );
        } catch (error) {
          reject(error);
        }
        resolve(concat);
      });
    });
  });
};
