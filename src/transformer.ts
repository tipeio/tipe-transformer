import isArray from 'lodash.isarray'
import reduce from 'lodash.reduce'
import { ISectionData, IParsedSectionData, IBlock } from './types'

import { transformHTML, transformMarkdown } from './transformers'

export { transformHTML, transformMarkdown }

export const transformer = (
  sections: ISectionData,
  parser: (() => any) | (() => any)[]
): IParsedSectionData => {
  let parserArray: any = parser
  if (!isArray(parserArray)) {
    // normalize to array
    parserArray = [parser]
  }

  return reduce(
    sections,
    (sectionsResult: any, section): IParsedSectionData => {
      let tempSection = {
        apiId: section.apiId,
        blocks: section.blocks,
        results: section.blocks.map((block: IBlock) => {
          return reduce(
            parserArray,
            (blockResult: any, currentParser: any): IBlock => {
              let parsedResult = currentParser(block)
              if (parsedResult) {
                blockResult = parsedResult
              }
              return blockResult
            },
            null
          )
        })
      }

      sectionsResult[section.apiId] = tempSection
      return sectionsResult
    },
    {}
  )
}
