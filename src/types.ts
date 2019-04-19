export interface IBlockData {
  time: number
  blocks: IBlock[]
  version: string
}

export interface IBlock {
  type: string
  data: IBlockFields
}

export interface IBlockFields {
  text?: string
  level?: number
  style?: string
  items?: string[]
  file?: {
    url: string
  }
  caption?: string
  withBorder?: boolean
  withBackground?: boolean
  stretched?: boolean
  [type: string]: boolean | string | object | number | string[] | any
}

export interface ITipeTransformers {
  [type: string]: Function
  html: Function
}

export interface IListTypes {
  ordered: string
  unordered: string
  [key: string]: string
}
