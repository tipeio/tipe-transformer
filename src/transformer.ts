import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import isArray from 'lodash.isarray'
import reduce from 'lodash.reduce'

import { ISectionData, ITipeTransformers, IBlock } from './types'
import { TransformerConstants } from './helpers/constants'
import { transformHTML, transformMarkdown } from './transformers'

export const tipeParsers: ITipeTransformers = {
  html: transformHTML,
  markdown: transformMarkdown
}

export const validateBlockData = (data: ISectionData): ISectionData => {
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
  parser: string | ((block: IBlock) => string)
): ((block: IBlock) => string) => {
  if (isString(parser) && tipeParsers.hasOwnProperty(parser)) {
    return tipeParsers[parser]
  }

  if (isFunction(parser)) {
    return parser
  }

  throw new Error(TransformerConstants.invalidParser)
}

export const handleParserArray = (
  parserArr: string[] | (string | ((blocks: IBlock) => string))[],
  blockData: ISectionData
): { result: string; blocks: ISectionData } => {
  const { blocks } = blockData
  const result = reduce(
    blocks,
    (htmlResult: string, block: IBlock): string => {
      parserArr.forEach(
        (parser): void => {
          const validParseMethod = validParser(parser)
          htmlResult += validParseMethod(block)
        }
      )
      return htmlResult
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
  const { blocks } = blockData
  const result = reduce(
    blocks,
    (htmlResult: string, block: IBlock): string => {
      htmlResult += validParseMethod(block)
      return htmlResult
    },
    ''
  )
  return {
    result,
    blocks: blockData
  }
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

      const blockData = validateBlockData(data)

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
