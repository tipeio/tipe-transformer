import reduce from 'lodash.reduce'
import showdown from 'showdown'
import { IBlock, IBlockType } from '../../types'

const markdownConverter = new showdown.Converter()

export const transformMarkdown = (block: IBlock): string => {
  let parsedBlock = reduce(
    block,
    (parsedBlock: string, blockType: IBlockType): string => {
      if (blockType === 'markdown') {
        parsedBlock = markdownConverter.makeHtml(block.content)
      }
      return parsedBlock
    },
    ''
  )
  return parsedBlock
}
