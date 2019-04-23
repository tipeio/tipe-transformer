import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
import { terser } from 'rollup-plugin-terser'
export default {
  input: 'src/index.ts',
  output: [
    {
      globals: {
        'lodash.isstring': 'isString',
        'lodash.isobject': 'isObject',
        'lodash.isfunction': 'isFunction'
      },
      dir: 'dist/cjs',
      format: 'cjs'
    },
    {
      globals: {
        'lodash.isstring': 'isString',
        'lodash.isobject': 'isObject',
        'lodash.isfunction': 'isFunction'
      },
      dir: 'dist/es',
      format: 'es' // the preferred format
    },
    {
      globals: {
        'lodash.isstring': 'isString',
        'lodash.isobject': 'isObject',
        'lodash.isfunction': 'isFunction'
      },
      dir: 'dist/bundle',
      format: 'iife',
      name: 'transformer' // the global which can be used in a browser
    }
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    terser() // minifies generated bundles
  ]
}
