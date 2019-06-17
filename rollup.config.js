/* eslint-disable no-undef */
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';

const plugins = [
  babel(),
  resolve(),
  serve(),
  livereload(),

  eslint({
    exclude: ['build/**']
  }),
  alias({
    'mini-react': __dirname + '/build/packages/mini-react/index.js',
    'mini-react-dom': __dirname + '/build/packages/mini-react-dom/index.js'
  })
];

export default [
  {
    input: 'packages/mini-react/index.js',
    output: {
      file: __dirname + '/build/packages/mini-react/index.js',
      format: 'esm'
    },
    plugins
  },
  {
    input: 'packages/mini-react-dom/index.js',
    output: {
      file: __dirname + '/build/packages/mini-react-dom/index.js',
      format: 'esm'
    },
    plugins
  },
  {
    input: 'src/index.js',
    output: {
      file: __dirname + '/build/bundle.min.js',
      format: 'cjs'
    },
    plugins
  }
];
