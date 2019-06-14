import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';

const plugins = [multiEntry(), resolve()];

export default [
  {
    input: 'src/*.js',
    output: {
      file: __dirname + '/build/app.min.js',
      format: 'cjs'
    },
    plugins
  },
  {
    input: 'packages/mini-react/*.js',
    output: {
      file: __dirname + '/build/packages/mini-react.min.js',
      format: 'cjs'
    },
    plugins
  }
];
