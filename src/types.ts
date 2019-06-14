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
  [type: string]: (block: IBlock) => string
  html: (block: IBlock) => string
  markdown: (block: IBlock) => string
}
