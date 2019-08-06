import reduce from 'lodash.reduce'
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

  return reduce(
    sections,
    (
      transformedSections: ITransformedSections[] | any,
      section: ISection
    ): IParsedSection[] | ISection[] => {
      let tempSection = {
        name: section.name,
        apiId: section.apiId,
        blocks: section.blocks.map((block: IBlock): IBlockResult[] | null =>
          reduce(
            plugins,
            (
              blockResult: IBlockResult | any,
              currentplugin: TransformerPlugin
            ): IBlockResult[] => {
              let parsedResult = currentplugin(block)

              if (parsedResult) {
                blockResult = { block, result: parsedResult }
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
