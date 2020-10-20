const child_process = require('child_process');

/**
 * Async wrapper for require('child_process').spawn
 * @param {String} cmd - Command to execute.
 * @param {Array<String>} args - Arguments to pass to the command
 * @param {*} opts - Options for spawner. {stdio: 'inherit'} is passed automatically but can be overwritten.
 * @returns {{code: String, signal: String}} - The code and signal on child process exit.
 */
export default function spawnChildProcess(cmd, args, opts = {}) {
  return new Promise(function(resolve) {
    opts = Object.assign({stdio: 'inherit'}, opts);
    child_process.spawn(cmd, args, opts).on('exit', function(code, signal) {
      resolve({code, signal});
    });
  });
}