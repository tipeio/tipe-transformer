import reduce from 'lodash.reduce'
import { ISectionData, IBlock } from '../../types'

export const transformHTML = (data: ISectionData): string => {
  return reduce(
    data.blocks,
    (html: string, blockVal: IBlock): string => {
      let element: string
      switch (blockVal.type) {
        case 'text':
          element = blockVal.content
          break
        case 'button':
          element = `<button>${blockVal.content}</button>`
          break
        case 'image':
          element = `<img src="${blockVal.content}" />`.replace(/\\"/g, '"')
          break
        case 'code':
          element = `<pre><code>${blockVal.content}</code></pre>`
          break
        default:
          element = ''
          break
      }
      html += element
      return html
    },
    ''
  )
}
