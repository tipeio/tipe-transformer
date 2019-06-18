import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import isArray from 'lodash.isarray'
import reduce from 'lodash.reduce'
import keyBy from 'lodash.keyby'

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
  parserArr: string[] | (string | ((block: IBlock) => string))[],
  blocks: IBlock[]
): string[] => {
  const result = reduce(
    blocks,
    (parsedResult: string[], block: IBlock): string[] => {
      parserArr.forEach(
        (parser): void => {
          const validParseMethod = validParser(parser)
          parsedResult.push(validParseMethod(block))
        }
      )
      return parsedResult.filter(Boolean)
    },
    []
  )

  return result
}

export const handleSingleParser = (
  parser: string | (() => string),
  blocks: IBlock[]
): string[] => {
  const validParseMethod = validParser(parser)
  const result = reduce(
    blocks,
    (parsedResult: string[], block: IBlock): string[] => {
      parsedResult.push(validParseMethod(block))
      return parsedResult.filter(Boolean)
    },
    []
  )
  return result
}

export const transformer = (
  data: any,
  parser: string | (() => string) | any
): Promise<{
  result: { sections: { [type: string]: { apiId: string; blocks: IBlock[] } } }
  data: { sections: ISectionData[] }
}> => {
  return new Promise(
    (resolve, reject): any => {
      if (!data || !parser) {
        reject(new Error(TransformerConstants.missingArguments))
      }

      // handle arrays
      if (isArray(parser)) {
        const result = Object.keys(data).map(
          (apiId: string): any => {
            const parsedSection = {
              apiId,
              blocks: reduce(
                validateBlockData(data[apiId]),
                (parsedBlock: string[], val: any): string[] => {
                  if (isArray(val)) {
                    return handleParserArray(parser, val)
                  }
                  return parsedBlock
                },
                []
              )
            }
            return parsedSection
          }
        )

        resolve({
          result: { sections: keyBy(result, 'apiId') },
          data: { sections: data }
        })
      }

      // single parser passed in
      const result = Object.keys(data).map(
        (apiId: string): any => {
          const parsedSection = {
            apiId,
            blocks: reduce(
              validateBlockData(data[apiId]),
              (parsedBlock, val): any => {
                if (isArray(val)) {
                  return handleSingleParser(parser, val)
                }
                return parsedBlock
              },
              []
            )
          }
          return parsedSection
        }
      )

      resolve({
        result: { sections: keyBy(result, 'apiId') },
        data: { sections: data }
      })
    }
  )
}
