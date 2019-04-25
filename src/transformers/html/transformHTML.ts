import reduce from 'lodash.reduce'
import {
  ICollectionData,
  ISection,
  IListTypes,
  IBlockFields
} from '../../types'

export const transformHTML = (data: ICollectionData): string => {
  return reduce(
    data.sections,
    (html: string, sectionVal: ISection[]): string => {
      let element: string

      const listTypes: IListTypes = {
        ordered: 'ol',
        unordered: 'ul'
      }

      sectionVal.forEach(
        (block: IBlockFields): void => {
          switch (block.type) {
            case 'header':
              const { level, text } = block.data
              element = `<h${level}>${text}</h${level}>`
              break

            case 'paragraph':
              element = `<p>${block.data.text}</p>`
              break

            case 'list':
              const { items, style } = block.data

              if (!items) throw new Error('items not defined!')
              if (!style) throw new Error('style not defined!')

              const type: string = listTypes[style]
              const li: string = items
                .map((i: string): string => `<li>${i}</li>`)
                .join('')

              element = `<${type}>${li}</${type}>`
              break
            case 'delimiter':
              element = '<hr>'
              break
            case 'image':
              const { file, caption } = block.data
              if (!file) throw new Error('file not defined!')
              element = `<img src="${file.url}" alt="${caption}" />`.replace(
                /\\"/g,
                '"'
              )
              break
            default:
              element = ''
              break
          }

          html += element
        }
      )

      return html
    },
    ''
  )
}
