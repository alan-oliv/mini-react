/* eslint-disable no-undef */
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';

const sassOptions = {
  output: true
};

const aliasOptions = {
  'mini-react-dom': __dirname + '/packages/mini-react-dom/index.js',
  'mini-react': __dirname + '/packages/mini-react/index.js',
  'mini-react-reconciler':
    __dirname + '/packages/mini-react-reconciler/index.js',
  shared: __dirname + '/packages/shared/index.js'
};

const plugins = [
  babel(),
  sass(sassOptions),
  resolve(),
  serve(),
  livereload(),
  alias(aliasOptions)
];

export default [
  {
    input: 'src/index.js',
    output: {
      file: __dirname + '/build/bundle.min.js',
      format: 'cjs'
    },
    plugins
  }
];
