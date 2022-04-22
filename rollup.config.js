import consts from 'rollup-plugin-consts'
import { banner } from './src/extension/banner';
import { scriptVersion } from './src/extension/versions';
import createGitInfo from 'gitinfo'

import fs from 'fs'
import cleanup from 'rollup-plugin-cleanup'
import clear from 'rollup-plugin-clear'
import commonjs from '@rollup/plugin-commonjs'
import copy from 'rollup-plugin-copy'
import eslint from '@rollup/plugin-eslint'
import resolve from '@rollup/plugin-node-resolve'
import prettier from 'rollup-plugin-prettier'
import replaceHtmlVars from 'rollup-plugin-replace-html-vars'
import scss from 'rollup-plugin-scss'
import { terser } from 'rollup-plugin-terser'


const gitInfo = createGitInfo();
const CONSTANTS = {
  version: scriptVersion,
  environment: 'production',
  git: {user: null, repository: null, branch: null}
};

CONSTANTS.git.user       = gitInfo.getUsername();
CONSTANTS.git.repository = gitInfo.getName();
CONSTANTS.git.branch     = gitInfo.getBranchName();

if (CONSTANTS.git.branch === 'development') { // if working in dev
   CONSTANTS.environment = 'development';
}


const waitFile = path => {
  return new Promise(resolve => {
    const interval = setInterval(() => {
      if (!fs.existsSync(path)) return
      clearInterval(interval)
      resolve(path)
    }, 100)
  });
}

clear({
  targets: ['build/'],
  watch: true
})
// rollup.config.js
/**
 * @type {import('rollup').RollupOptions}
 */
export default [

    {
    input: 'src/extension/build-info/versioning.js',
    /**
     * @type {import('rollup').OutputOptions}
     */
    output: {
      format: 'es',
      file: 'src/versionInfo.js',
      name: 'versionInfo',
      freeze: false,
      generatedCode: {constBindings: true},
    },
    plugins: [
      consts( CONSTANTS )
    ],
  },
  {
    input: 'src/newcanvas/js/pako.js',
    output: {
      format: 'iife',
      file: 'build/newcanvas/pako.js'
    },
    plugins: [
      commonjs(),
      resolve(),
      cleanup(),
      eslint({ exclude: ['/build/*.js'] }),
      terser()
    ]
  },
  {
    input: 'src/newcanvas/js/pathseg.js',
    output: {
      format: 'iife',
      file: 'build/newcanvas/pathseg.js'
    },
    plugins: [
      commonjs(),
      resolve(),
      cleanup(),
      eslint({ exclude: ['/build/*.js'] }),
      terser()
    ]
  },
  {
    input: 'src/newcanvas.js',
    output: {
      format: 'iife',
      file: 'build/newcanvas/script.js'
    },
    plugins: [
      scss({
        output: 'build/newcanvas/style.css',
        outputStyle: 'compressed'
      }),
      eslint({
        exclude: ['/build/*.js']
      }),
      commonjs(),
      resolve(),
      cleanup(),
      prettier({
        cwd: __dirname,
        semi: true
      }),
      copy({
        targets: [
          { src: 'src/newcanvas/html/index.html', dest: 'build/newcanvas' }
        ]
      })
    ]
  },
  {
    input: 'src/extension.js',
    output: {
      format: 'iife',
      file: 'build/drawception-anbt.user.js',
      banner: banner(CONSTANTS),
    },
    plugins: [
      commonjs(),
      resolve(),
      cleanup(),
      eslint({ exclude: ['/build/*.js'] }),
      prettier({
        cwd: __dirname,
        semi: true
      }),
      copy({
        targets: [{ src: 'build/newcanvas/index.html', dest: 'build/' }]
      }),
      waitFile('build/index.html').then(file => {
        replaceHtmlVars({
          files: file,
          from: [
            '/*NEWCANVAS_STYLE*/',
            '/*PAKO_SCRIPT*/',
            '/*PATHSEG_SCRIPT*/',
            '/*NEWCANVAS_SCRIPT*/'
          ],
          to: [
            fs.readFileSync('build/newcanvas/style.css', 'utf8'),
            fs.readFileSync('build/newcanvas/pako.js', 'utf8'),
            fs.readFileSync('build/newcanvas/pathseg.js', 'utf8'),
            fs.readFileSync('build/newcanvas/script.js', 'utf8')
          ]
        })
      })
    ]
  }
]
