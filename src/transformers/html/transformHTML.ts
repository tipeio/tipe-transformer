import reduce from 'lodash.reduce'
import { ISectionData, IBlock } from '../../types'

export const transformHTML = (html: string, data: ISectionData): string => {
  const result = reduce(
    data.blocks,
    (htmlResult: string, blockVal: IBlock): string => {
      switch (blockVal.type) {
        case 'text':
          htmlResult += blockVal.content
          break
        case 'button':
          htmlResult += `<button>${blockVal.content}</button>`
          break
        case 'image':
          htmlResult += `<img src="${blockVal.content}" />`.replace(/\\"/g, '"')
          break
        case 'code':
          htmlResult += `<pre><code>${blockVal.content}</code></pre>`
          break
        default:
          break
      }
      return htmlResult
    },
    html
  )
  return result
}
