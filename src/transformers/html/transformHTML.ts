import reduce from 'lodash.reduce'
import { IBlock } from '../../types'

export const transformHTML = (block: IBlock): string => {
  const result = reduce(
    block,
    (htmlResult: string, blockVal: any): string => {
      switch (blockVal) {
        case 'text':
          htmlResult += block.content
          break
        case 'button':
          htmlResult += `<button>${block.content}</button>`
          break
        case 'image':
          htmlResult += `<img src="${block.content}" />`.replace(/\\"/g, '"')
          break
        case 'code':
          htmlResult += `<pre><code>${block.content}</code></pre>`
          break
        default:
          break
      }
      return htmlResult
    },
    ''
  )
  return result
}
