'use strict';

const fs = require('fs');
// const path = require('path');
const execa = require('execa');

const rootDir = process.cwd();

const updateResFile = async res => {
  try {
    const modules = `export default ${res}`;
    await execa('echo', [ modules ]).stdout.pipe(fs.createWriteStream(`${rootDir}/template/modules.js`));

    // await execa('git', [ 'clone', 'git@github.com:cravatcat/brick-base.git' ], {
    //   cwd: `${rootDir}/template/`,
    // });
    await execa('cp', [ 'modules.js', './brick-base/src/mock.js' ], {
      cwd: `${rootDir}/template/`,
    });

    // console.log('npm install start');
    // await execa('npm', [ 'install' ], {
    //   cwd: `${rootDir}/template/brick-base/`,
    // });
    // console.log('npm install done');

    await execa('npm', [ 'run', 'build' ], {
      cwd: `${rootDir}/template/brick-base/`,
    });
    console.log('-----all done-----');
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  updateResFile,
};

