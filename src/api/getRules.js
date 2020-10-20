const thenifyAll = require('thenify-all');
const fs = thenifyAll(require('fs'));

/**
 * Gets rules from .commonignore organized by output filename.
 * @param {String} commonignorePath - Absolute path to .commonignore file.
 * @returns {everywhere: Array<String>, files: {[filename]: Array<String>}} - An array containing rules that apply in all files [everywhere] and an object with specific rules for each output file [files].
 */
export default async function getRules(commonignorePath) {
  const commonignore = (await fs.readFile(commonignorePath)).toString();
  const rules = commonignore.split('\n');
  const everywhere = [];
  const files = {};
  let currentIgnore = null;
  for (const rule of rules) {
    if (rule.slice(0, 2) === '#!') {
      currentIgnore = rule.slice(3);
    } else {
      if (currentIgnore === null) {
        everywhere.push(rule);
      } else {
        if (!files[currentIgnore]) {
          files[currentIgnore] = [];
        }
        files[currentIgnore].push(rule);
      }
    }
  }
  return {files, everywhere};
}