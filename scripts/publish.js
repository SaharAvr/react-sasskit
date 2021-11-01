/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

const spawnPromise = (cmd, args, options) => {

  const { spawn } = require('child_process');

  return new Promise((resolve, reject) => {

    const process = spawn(cmd, args, options);

    if (process.stdout) {
      process.stdout.on('data', data => {
        console.log(`${data}`);
      });
    }

    if (process.stderr) {
      process.stderr.on('data', data => {
        console.log(`${data}`);
      });
    }

    process.on('close', resolve);
    process.on('error', reject);

  });

};

const updatePackageJsonsVersion = ({ version }) => {

  const currentPackage = require('../package.json');
  const srcPackage = require('../src/package.json');

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'package.json'),
    JSON.stringify({ ...srcPackage, version }, null, 2),
    { encoding: 'utf-8' },
  );

  fs.writeFileSync(
    path.join(__dirname, '..', 'package.json'),
    JSON.stringify({ ...currentPackage, version }, null, 2),
    { encoding: 'utf-8' },
  );

};

module.exports = (async () => {

  const yargs = require('yargs/yargs');
  const { hideBin } = require('yargs/helpers');
  const { argv } = yargs(hideBin(process.argv));

  let nextVersion;
  const { version } = require('../src/package.json') || {};
  const { major, minor, patch } = version.match(/^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)$/)?.groups;

  if (!major || !minor || !patch) {
    console.error('[scripts/publish]: version format error', { version });
    return;
  }

  if (argv.major) {
    nextVersion = `${(Number(major) + 1)}.0.0`;
  }

  if (argv.minor) {
    nextVersion = `${major}.${(Number(minor) + 1)}.0`;
  }

  if (argv.patch) {
    nextVersion = `${major}.${minor}.${(Number(patch) + 1)}`;
  }

  updatePackageJsonsVersion({ version: nextVersion });

  try {

    await spawnPromise('npm publish --registry https://registry.npmjs.org/', null, {
      cwd: './src',
      stdio: 'inherit',
      shell: true,
    });

  } catch (err) {

    console.error('[scripts/publish]: failed to publish', err);
    updatePackageJsonsVersion({ version });

  }

})();
