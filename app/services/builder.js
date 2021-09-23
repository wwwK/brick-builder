'use strict';

const fs = require('fs');
// const path = require('path');
const execa = require('execa');

const rootDir = process.cwd();

const dirExits = (path) => {
  return new Promise(resolve => {
    fs.access(path, err => {
      if(err) {
        resolve(false)
      } else {
        resolve(true);
      }
    });
  });
};

const writeFile = (content, path) => {
  return new Promise(resolve => {
    const writerStream = fs.createWriteStream(path);
    writerStream.on('close', () => {
      console.log('请求写入成功');
      resolve(true);
    })
    execa('echo', [ content ]).stdout.pipe(writerStream);
  })
};

const updateResFile = async (res) => {
  try {
    const modules = `export default ${res}`;
    await writeFile(modules, `${rootDir}/template/modules.js`);
    const brickBaseDirExits = await dirExits(`${rootDir}/template/brick-base`);

    if(!brickBaseDirExits) {
      console.log('git clone git@github.com:cravatcat/brick-base.git');
      await execa('git', [ 'clone', 'git@github.com:cravatcat/brick-base.git' ], {
        cwd: `${rootDir}/template/`,
      })
      console.log('git clone done');
    }
  
    await execa('cp', [ 'modules.js', './brick-base/src/mock.js' ], {
      cwd: `${rootDir}/template/`,
    });
    console.log('复制mock文件成功');

    const nodeModulesDirExits = await dirExits(`${rootDir}/template/brick-base/node_modules`);
    if(!nodeModulesDirExits) {
      console.log('install...');
      await execa('npm', [ 'install' ], {
        cwd: `${rootDir}/template/brick-base/`,
      });
    }
   
    console.log('build...');
    await execa('npm', [ 'run', 'build' ], {
      cwd: `${rootDir}/template/brick-base/`,
    });
    console.log('build完成');
  } catch (error) {
    console.log(error);
    execa('rm', ['-rf', '*'], {
      cwd: `${rootDir}/template/`
    });
  }
};

module.exports = {
  updateResFile,
};

