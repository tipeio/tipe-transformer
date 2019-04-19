import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import isFunction from 'lodash.isfunction';
import { TransformerConstants } from './helpers/constants';
import { transformHTML } from './transformers/html';
export const tipeParsers = {
    html: transformHTML
};
export const validBlockData = (data) => {
    let blockData;
    if (data && isString(data)) {
        try {
            blockData = JSON.parse(data);
        }
        catch (error) {
            console.error(error);
        }
    }
    if (data && isObject(data))
        return data;
    return blockData;
};
export const validParser = (parser) => {
    if (isFunction(parser)) {
        return parser;
    }
    if (isString(parser) && tipeParsers.hasOwnProperty(parser)) {
        return tipeParsers[parser];
    }
    throw TransformerConstants.invalidParser;
};
export const transformer = (data, parser) => {
    const blockData = validBlockData(data);
    const parseMethod = validParser(parser);
    if (!data || !parser)
        throw TransformerConstants.missingArguments;
    if (!blockData || !parseMethod)
        throw TransformerConstants.somethingWentWrong;
    return parseMethod(blockData);
};
//# sourceMappingURL=transformer.js.map