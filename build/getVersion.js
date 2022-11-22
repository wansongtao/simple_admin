const shelljs = require('shelljs');
let version = '';

if (shelljs.which('git')) {
  version = shelljs.exec('git tag', { silent: true }).stdout;
  if (version) {
    const versions = version.split('\n');
    version = versions[versions.length - 2];
  }
}

if (!version) {
  version = `v${Date.now()}`;
}

module.exports = version;
