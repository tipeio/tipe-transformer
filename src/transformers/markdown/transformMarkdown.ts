import reduce from 'lodash.reduce'
import showdown from 'showdown'
import { ISectionData, IBlock } from '../../types'

const markdownConverter = new showdown.Converter()

export const transformMarkdown = (html: string, data: ISectionData): string => {
  return reduce(
    data.blocks,
    (htmlResult: string, blockVal: IBlock): string => {
      if (blockVal.type === 'markdown') {
        htmlResult += markdownConverter.makeHtml(blockVal.content)
        return htmlResult
      }
      return htmlResult
    },
    html
  )
}
