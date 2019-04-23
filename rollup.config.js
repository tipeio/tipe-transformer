import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
export default [
  {
    input: 'src/index.ts',
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        typescript: require('typescript')
      }),
      terser()
    ],
    output: {
      file: pkg.browser,
      format: 'umd',
      name: 'transformer',
      esModule: false,
      globals: {
        'lodash.isstring': 'isString',
        'lodash.isobject': 'isObject',
        'lodash.isfunction': 'isFunction'
      }
    }
  },
  {
    input: 'src/index.ts',
    plugins: [
      typescript({
        typescript: require('typescript')
      })
    ],
    output: [
      {
        file: pkg.module,
        format: 'esm'
      },
      {
        file: pkg.main,
        format: 'cjs'
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependancies || {})
    ]
  }
]
