export interface ISectionData {
  [type: string]: {
    apiId: string
    blocks: IBlock[]
  }
}

export interface IParsedSectionData {
  [type: string]: {
    apiId: string
    blocks: IBlock[]
    results: any[]
  }
}

export interface IBlockData {
  lang?: string
}
export interface IBlock {
  [type: string]: string | any
  apiId: string
  content: string
  data?: IBlockData
}

export interface ITipeTransformers {
  [type: string]: (block: IBlock) => string
  html: (block: IBlock) => string
  markdown: (block: IBlock) => string
}
