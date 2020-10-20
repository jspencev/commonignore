import commonignore from './api/commonignore';
import { spawnChildProcess } from './util';

(async function() {
  const argv = require('yargs')
    .option('add', {
      alias: 'a',
      description: 'Run git add [filenames] after the files are created.'
    })
    .help()
    .argv;

  const files = await commonignore(process.cwd());
  let writeConfirmation = 'commonignore: Wrote ';
  const gitAdd = ['add'];
  for (const filename in files) {
    writeConfirmation += `${filename}, `;
    gitAdd.push(filename);
  }
  writeConfirmation = writeConfirmation.slice(0, -2);
  console.log(writeConfirmation);

  if (argv.add) {
    console.log(`git ${gitAdd.join(' ')}`);
    await spawnChildProcess('git', gitAdd);
  }
})();
