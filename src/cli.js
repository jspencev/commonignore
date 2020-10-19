import commonignore from './api/commonignore';

(async function() {
  const files = await commonignore(process.cwd());
  let done = 'commonignore: Wrote ';
  for (const filename in files) {
    done += `${filename}, `;
  }
  done = done.slice(0, -2);
  console.log(done);
})();
