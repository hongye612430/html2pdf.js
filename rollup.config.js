// Import dependencies.
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';
import fs from 'fs';

function license(filename) {
  filename = filename || './LICENSE';
  var data = fs.readFileSync(filename).toString();
  console.log(data);
  console.log(typeof data);
  data = '/**\n * @license\n * ' + data.trim().replace(/\n/g, '\n * ') + '\n */\n';
  return { banner: data };
}

export default [
  // Bundled builds.
  {
    name: 'html2pdf',
    input: 'src/index.js',
    output: [
      { file: pkg.browser.replace(/js$/, 'bundle.js'), format: 'umd' }
    ],
    globals: {
      jspdf: 'jsPDF',
      html2canvas: 'html2canvas'
    },
    plugins: [
      resolve(),
      commonjs(),
      license('./LICENSE')
    ]
  },
  // Un-bundled builds.
  {
    name: 'html2pdf',
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
      { file: pkg.browser, format: 'umd' }
    ],
    external: [
      'jspdf',
      'html2canvas',
      'es6-promise/auto'
    ],
    globals: {
      jspdf: 'jsPDF',
      html2canvas: 'html2canvas'
    },
    plugins: [
      resolve(),
      commonjs(),
      license('./LICENSE')
    ]
  }
];
