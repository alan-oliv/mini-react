import multiEntry from 'rollup-plugin-multi-entry';
import resolve from 'rollup-plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';
import { eslint } from "rollup-plugin-eslint";

const plugins = [multiEntry(), resolve(), serve(), livereload(), eslint()];

export default [
  {
    input: 'src/index.js',
    output: {
      file: __dirname + '/build/bundle.min.js',
      format: 'cjs'
    },
    plugins
  },
  {
    input: 'packages/mini-react/index.js',
    output: {
      file: __dirname + '/build/packages/mini-react/mini-react.min.js',
      format: 'cjs'
    },
    plugins
  },
  {
    input: 'packages/mini-react-dom/index.js',
    output: {
      file: __dirname + '/build/packages/mini-react-dom/mini-react-dom.min.js',
      format: 'cjs'
    },
    plugins
  }
];
