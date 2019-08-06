export interface ISection {
  name: string
  apiId: string
  blocks: IBlock[]
}

export interface IParsedSection {
  name: string
  apiId: string
  blocks: IBlockResult[]
}

export interface ITransformedSections {
  [key: string]: IParsedSection
}

export interface ISections {
  [type: string]: ISection
}

export interface IBlock {
  id: string
  type: string
  content: string
  data?: any
}

export interface IParsedBlock {
  [type: string]: any
}

export interface IBlockResult {
  block: IBlock
  result: IParsedBlock | string
}

export type IBlockType = 'image' | 'text' | 'markdown' | 'button' | 'code'

export interface ITipeTransformers {
  [type: string]: (block: IBlock) => string
  html: (block: IBlock) => string
  markdown: (block: IBlock) => string
}

export type TransformerPlugin = (block: IBlock) => any
