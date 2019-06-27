import reduce from 'lodash.reduce'
import {
  ISections,
  ITransformedSections,
  IBlock,
  TransformerPlugin,
  ISection
} from './types'
import { transformHTML, transformMarkdown } from './transformers'
export { transformHTML, transformMarkdown }

export const transformer = (
  sections: ISections,
  plugin: TransformerPlugin | TransformerPlugin[]
): ITransformedSections => {
  let plugins: TransformerPlugin[] = plugin as TransformerPlugin[]

  if (!Array.isArray(plugins)) {
    // normalize to array
    plugins = [plugin as TransformerPlugin]
  }

  return reduce(
    sections,
    (
      transformedSections: ITransformedSections,
      section: ISection
    ): ITransformedSections => {
      let tempSection = {
        apiId: section.apiId,
        blocks: section.blocks,
        results: section.blocks.map((block: IBlock) =>
          reduce(
            plugins,
            (blockResult: any, currentplugin: TransformerPlugin): IBlock => {
              let parsedResult = currentplugin(block)

              if (parsedResult) {
                blockResult = parsedResult
              }

              return blockResult
            },
            null
          )
        )
      }

      transformedSections[section.apiId] = tempSection
      return transformedSections
    },
    {}
  )
}
