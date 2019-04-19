import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'

import { IBlockData, ITipeTransformers } from './types'
import { TransformerConstants } from './helpers/constants'
import { transformHTML } from './transformers/html'

export const tipeParsers: ITipeTransformers = {
  html: transformHTML
}

export const validBlockData = (data: IBlockData): IBlockData => {
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

  throw TransformerConstants.invalidParser
}

export const transformer = (
  data: IBlockData,
  parser: string | Function
): string => {
  const blockData = validBlockData(data)
  const parseMethod = validParser(parser)

  if (!data || !parser) throw TransformerConstants.missingArguments

  if (!blockData || !parseMethod) throw TransformerConstants.somethingWentWrong

  return parseMethod(blockData)
}
