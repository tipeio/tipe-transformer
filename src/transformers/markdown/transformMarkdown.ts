import reduce from 'lodash.reduce'
import showdown from 'showdown'
import { IBlock } from '../../types'

const markdownConverter = new showdown.Converter()

export const transformMarkdown = (block: IBlock): string => {
  let htmlResult = reduce(
    block,
    (htmlResult: string, blockVal: any): string => {
      if (blockVal === 'markdown') {
        htmlResult = markdownConverter.makeHtml(block.content)
        return htmlResult
      }
      return htmlResult
    },
    ''
  )
  return htmlResult
}
