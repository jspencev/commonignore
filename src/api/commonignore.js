const path = require('path');
import { findPackage } from '@carbon/node-util';
import getRules from './getRules';
import writeFiles from './writeFiles';

/**
 * Reads the .commonignore file in the root of the app and writes .ignore files specified.
 * @param {String} cwd - Current working directory. Defaults to process.cwd()
 * @returns {[filename]: Array<String>} - Rules written in each .ignore file
 */
export default async function commonignore(cwd) {
  const {packPath} = await findPackage(cwd);
  const appRootPath = path.parse(packPath).dir;
  const commonignorePath = path.join(appRootPath, './.commonignore');
  const rules = await getRules(commonignorePath);
  const outFiles = await writeFiles(appRootPath, rules.everywhere, rules.files);
  return outFiles;
}