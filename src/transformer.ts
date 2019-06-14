import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import isArray from 'lodash.isarray'
import reduce from 'lodash.reduce'

import { ISectionData, ITipeTransformers } from './types'
import { TransformerConstants } from './helpers/constants'
import { transformHTML, transformMarkdown } from './transformers'

export const tipeParsers: ITipeTransformers = {
  html: transformHTML,
  markdown: transformMarkdown
}

export const validBlockData = (data: ISectionData): ISectionData => {
  let blockData

  if (data && isString(data)) {
    try {
      blockData = JSON.parse(data)
    } catch (error) {
      throw new Error(error)
    }
  }

  if (blockData && !blockData.hasOwnProperty('blocks'))
    throw new Error(TransformerConstants.blockDataMissing)

  if (data && isObject(data)) return data

  return blockData
}

export const validParser = (
  parser: string | ((html: string, data: ISectionData) => string)
): ((html: string, data: ISectionData) => string) => {
  if (isString(parser) && tipeParsers.hasOwnProperty(parser)) {
    return tipeParsers[parser]
  }

  if (isFunction(parser)) {
    return parser
  }

  throw new Error(TransformerConstants.invalidParser)
}

export const handleParserArray = (
  parserArr: string[] | (() => string)[],
  blockData: ISectionData
): { result: string; blocks: object } => {
  const result = reduce(
    parserArr,
    (html: string, parseMethod: any): string => {
      const validParseMethod = validParser(parseMethod)
      html += validParseMethod('', blockData)
      return html
    },
    ''
  )

  return { result, blocks: blockData }
}

export const handleSingleParser = (
  parser: (() => string) | string | any,
  blockData: ISectionData
): { result: string; blocks: object } => {
  const validParseMethod = validParser(parser)
  const result = {
    result: validParseMethod('', blockData),
    blocks: blockData
  }
  return result
}

export const transformer = (
  data: ISectionData,
  parser: string | (() => string) | (() => string | string)[]
): Promise<{ result: string; blocks: object }> => {
  return new Promise(
    (resolve, reject): void => {
      if (!data || !parser) {
        reject(new Error(TransformerConstants.missingArguments))
      }

      const blockData = validBlockData(data)

      if (!blockData) {
        reject(new Error(TransformerConstants.somethingWentWrong))
      }

      // handle arrays
      if (isArray(parser)) resolve(handleParserArray(parser, blockData))

      // single parser passed in
      resolve(handleSingleParser(parser, blockData))
    }
  )
}
