import reduce from 'lodash.reduce'
import { IBlock, IBlockType } from '../../types'

export const transformHTML = (block: IBlock): string => {
  const result = reduce(
    block,
    (parsedBlock: string, blockType: IBlockType): string => {
      switch (blockType) {
        case 'text':
          parsedBlock = block.content
          break
        case 'button':
          parsedBlock = `<button>${block.content}</button>`
          break
        case 'image':
          parsedBlock = `<img src="${block.content}" />`.replace(/\\"/g, '"')
          break
        case 'code':
          if (block.data) {
            parsedBlock = `<pre><code class="${block.data.lang} ${
              block.data.lang
            }-css">${block.content}</code></pre>`
          }
          break
        default:
          break
      }
      return parsedBlock
    },
    ''
  )
  return result
}
