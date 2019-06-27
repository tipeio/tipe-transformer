export interface ISection {
  apiId: string
  blocks: IBlock[]
}

export interface ITransformedSection extends ISection {
  results: any[]
}

export interface ISections {
  [type: string]: ISection
}

export interface ITransformedSections {
  [type: string]: ITransformedSection
}

export interface IBlockData {
  [field: string]: any
}

export interface IBlock {
  id: string
  type: string
  content: string
  data?: IBlockData
}

export interface ITipeTransformers {
  [type: string]: (block: IBlock) => string
  html: (block: IBlock) => string
  markdown: (block: IBlock) => string
}

export type TransformerPlugin = (block: IBlock) => any
