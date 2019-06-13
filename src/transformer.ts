import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import isArray from 'lodash.isarray'

import { ISectionData, ITipeTransformers } from './types'
import { TransformerConstants } from './helpers/constants'
import { transformHTML } from './transformers/html'
import { resolve } from 'dns'

export const tipeParsers: ITipeTransformers = {
  html: transformHTML
}

export const validBlockData = (data: ISectionData): ISectionData => {
  let blockData

  if (data && isString(data)) {
    try {
      blockData = JSON.parse(data)
    } catch (error) {
      console.error(error)
    }
  }

  if (data && isObject(data)) return data

  return blockData
}

export const validParser = (
  parser: string | (() => string) | (() => string | string)[]
): ((data: ISectionData) => string) => {
  if (isString(parser) && tipeParsers.hasOwnProperty(parser))
    return tipeParsers[parser]

  if (isFunction(parser)) return parser

  throw new Error(TransformerConstants.invalidParser)
}

export const transformer = (
  data: ISectionData,
  parser: string | (() => string) | (() => string | string)[]
): Promise<object> => {
  return new Promise(
    (resolve, reject): void => {
      if (!data || !parser) {
        reject(new Error(TransformerConstants.missingArguments))
      }

      const blockData = validBlockData(data)
      const parseMethod = validParser(parser)

      if (!blockData || !parseMethod) {
        reject(new Error(TransformerConstants.somethingWentWrong))
      }
      const { blocks } = data
      const result = {
        result: parseMethod(blockData),
        blocks
      }
      resolve(result)
    }
  )
}
