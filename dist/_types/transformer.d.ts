import { IBlockData, ITipeTransformers } from './types';
export declare const tipeParsers: ITipeTransformers;
export declare const validBlockData: (data: IBlockData) => IBlockData;
export declare const validParser: (parser: string | Function) => Function;
export declare const transformer: (data: IBlockData, parser: string | Function) => string;
