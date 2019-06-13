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
  [type: string]: (data: ISectionData) => string
  html: (data: ISectionData) => string
}
