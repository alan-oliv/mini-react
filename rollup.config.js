import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';

const plugins = [
  multiEntry(),
  resolve(),
  serve(),
  livereload()
  // babel({
  //   exclude: 'node_modules/**'
  // })
];

export default {
  input: 'packages/mini-react/*.js',
  output: {
    file: __dirname + '/build/packages/mini-react.min.js',
    format: 'cjs'
  },
  plugins
};
