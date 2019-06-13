import isString from 'lodash.isstring'
import isObject from 'lodash.isobject'
import isFunction from 'lodash.isfunction'
import isArray from 'lodash.isarray'

import { ISectionData, ITipeTransformers } from './types'
import { TransformerConstants } from './helpers/constants'
import { transformHTML } from './transformers/html'

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
): string => {
  if (!data || !parser) throw new Error(TransformerConstants.missingArguments)

  const blockData = validBlockData(data)
  const tempHtml = {
    customHtml: '',
    tipeHtml: ''
  }

  // validate parsers in array
  if (isArray(parser)) {
    parser.forEach(
      (customParser): void => {
        const customParseMethod = validParser(customParser)
        if (!blockData || !customParseMethod) {
          throw new Error(TransformerConstants.somethingWentWrong)
        }
        tempHtml.customHtml += customParseMethod(blockData)
        console.log('TCL: customParser tempHtml', tempHtml)
      }
    )
  } else {
    // validate parser
    const parseMethod = validParser(parser)

    if (!blockData || !parseMethod)
      throw new Error(TransformerConstants.somethingWentWrong)

    tempHtml.tipeHtml += parseMethod(blockData)
  }

  const result = `${tempHtml.tipeHtml + tempHtml.customHtml}`
  console.log('TCL: result', result)
  return result
}
