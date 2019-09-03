

const path = require('path');

module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

      return `const React = require('react');
      module.exports = () => ${assetFilename};`;
  },
};
