export interface ISectionData {
  apiId: string
  blocks: object
}

export interface ISection {
  [type: string]: IBlock[]
}

export interface IBlock {
  type: string
  apiId: string
  content: string
}

export interface ITipeTransformers {
  [type: string]: (html: string, data: ISectionData) => string
  html: (html: string, data: ISectionData) => string
  markdown: (html: string, data: ISectionData) => string
}
