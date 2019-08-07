import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { main, browser, module, dependencies } from './package.json'
import { terser } from 'rollup-plugin-terser'

const whiteList = {
  'lodash.isarray': true,
  'lodash.reduce': true
}

const plugins = [
  resolve({
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    }
  }),
  commonjs(),
  typescript({
    typescript: require('typescript'),
    tsconfig: 'tsconfig.json'
  }),
  json()
]

export default [
  {
    input: 'src/index.ts',
    plugins: [...plugins, terser()],
    output: {
      file: module,
      format: 'umd',
      name: 'transform',
      esModule: false,
      exports: 'named',
      globals: {
        'lodash.isarray': 'isArray',
        'lodash.reduce': 'reduce'
      }
    }
  },
  {
    input: 'src/index.ts',
    plugins,
    output: [
      {
        file: browser,
        format: 'esm'
      },
      {
        file: main,
        format: 'cjs'
      }
    ],
    external: [
      ...Object.keys(dependencies).filter(dep => !whiteList[dep] || {})
    ]
  }
]
