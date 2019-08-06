import reduce from 'lodash.reduce'
import keyBy from 'lodash.keyby'
import {
  IBlock,
  TransformerPlugin,
  ITransformedSections,
  IParsedSection,
  IBlockResult,
  ISection
} from './types'
import { transformHTML, transformMarkdown } from './transformers'
export { transformHTML, transformMarkdown }

export const transform = (
  sections: ISection[],
  plugin: TransformerPlugin | TransformerPlugin[]
): ITransformedSections => {
  let plugins: TransformerPlugin[] = plugin as TransformerPlugin[]

  if (!Array.isArray(plugins)) {
    // normalize to array
    plugins = [plugin as TransformerPlugin]
  }

  const transformedSections = reduce(
    sections,
    (
      transformedSections: ITransformedSections[] | Array<any>,
      section: ISection,
      index
    ): IParsedSection[] | Array<any> => {
      let tempSection = {
        name: section.name,
        apiId: section.apiId,
        blocks: section.blocks.map((block: IBlock) =>
        reduce(
          plugins,
          (blockResult: any, currentplugin: TransformerPlugin): IBlockResult | any => {
            let parsedResult = currentplugin(block)

            if (parsedResult) {
              blockResult = {block, result: parsedResult}
            }

            return blockResult
          },
          null
        )
      )
      }

      transformedSections[index] = tempSection
      return transformedSections
    },
    []
  )

  return keyBy(transformedSections, 'apiId')
}
