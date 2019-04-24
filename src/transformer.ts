import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'

import { ICollectionData, ITipeTransformers } from './types'
import { TransformerConstants } from './helpers/constants'
import { transformHTML } from './transformers/html'

export const tipeParsers: ITipeTransformers = {
  html: transformHTML
}

export const validBlockData = (data: ICollectionData): ICollectionData => {
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

export const validParser = (parser: string | Function): Function => {
  if (isFunction(parser)) {
    return parser
  }

  if (isString(parser) && tipeParsers.hasOwnProperty(parser)) {
    return tipeParsers[parser]
  }

  throw new Error(TransformerConstants.invalidParser)
}

export const transformer = (
  data: ICollectionData,
  parser: string | Function
): string => {
  const blockData = validBlockData(data)
  const parseMethod = validParser(parser)

  if (!data || !parser) throw new Error(TransformerConstants.missingArguments)

  if (!blockData || !parseMethod)
    throw new Error(TransformerConstants.somethingWentWrong)

  return parseMethod(blockData)
}
