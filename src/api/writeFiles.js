const thenifyAll = require('thenify-all');
const fs = thenifyAll(require('fs'));
const path = require('path');

/**
 * Writes .ignore files as specified by the rules. Rules are written for each filename key in the files argument.
 * @param {String} appRootPath - Abolute path to the root of the application.
 * @param {Array<String>} everywhere - Rules that apply in all files.
 * @param {{[filename]: Array<String>}} files - Object of {filename: [rules]} combinations specifying specific rules applied for each .ignore file. Filenames are relative to appRootPath.
 * @returns {[filename]: Array<String>} - Object of {filename: [rules]} combinations that displays the rules written in each filename.
 */
export default async function writeFiles(appRootPath, everywhere, files) {
  const outputFiles = {};
  for (const filename in files) {
    let rules = [
      '# This file was created automatically by commonignore.',
      '# Do not modify this file directly, modify .commonignore under the correct heading.',
      '# Refer to https://github.com/jspencev/commonignore for more info.',
      '',
      '# These rules apply in all .ignore files:'
    ];
    rules = rules.concat(everywhere);
    rules.push(`# These rules apply just to ${filename}:`);
    rules = rules.concat(files[filename]);

    outputFiles[filename] = rules;
    const code = rules.join('\n');
    const filePath = path.join(appRootPath, filename);
    await fs.writeFile(filePath, code);
  }
  return outputFiles;
}