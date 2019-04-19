import * as _ from 'lodash'

export class TipeTransform {
  public data: JSON
  public parser: string | Function

  constructor(data: JSON, parser: string) { }
  
  parseHTML = (data: object) => data.blocks.reduce((html: any, block: any) => {
    let element: any = ''
    interface IListTypes {
      ordered: string
      unordered: string
      [key: string]: string;
    }
    const listTypes: IListTypes = {
      ordered: 'ordered',
      unordered: 'unordered'
    }
  
    switch (block.type) {
      case 'header':
        const {level, text} = block.data
        element = `<h${level}>${text}</h${level}>`
        break
  
      case 'paragraph':
        element = `<p>${block.data.text}</p>`
        break
      
      case 'list':
        const {items, style} = block.data
        const type: string = listTypes[style]
        const li: string = items.map((i: any) => `<li>${i}</li>`).join('')
  
        element = `<${type}>${li}</${type}>`
        break
  
      case 'delimiter':
        element = '<hr>'
        break
  
      case 'image':
        const {file, caption} = block.data
        element = `<img src="${file.url}" alt="${caption}" />`
        break
      default:
        element = ''
        break;
    }
  
    return html + element
  }, '')}

}

export const transformer = (data: any, parser: string | Function) => { 

  // if parser is string, check for the parser internally

  // if parser is string and we don't have it, throw
  
  // if parser is function, pass the function the data and return it

  if (customParser && _.isFunction(customParser)) {
    return customParser(data)
  } else if(customParser && !_.isFunction(customParser)) {
    throw 'Custom parser must be a function'
  }
  return 
}

import tipeTransformer from '@tipe/tipe-transformer';

const html = tipeTransformer(data, 'html')