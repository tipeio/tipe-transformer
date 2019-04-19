import { transformer } from './transformer';
import { TransformerConstants } from './helpers/constants';
import * as mockBlocks from './helpers/mockBlocks.json';
describe('transformer', () => {
    it('should take a tipeParser name as a string and use the corresponding tipeParser', () => {
        const html = transformer(mockBlocks, 'html');
        expect(html.length).toBeGreaterThan(1);
    });
    it('should throw if the parser argument is a string and does not map to a tipeParser', () => {
        const htmlCaller = () => {
            return transformer(mockBlocks, 'foo');
        };
        expect(htmlCaller).toThrow(TransformerConstants.invalidParser);
    });
    it('should use a parser function if passed in', () => {
        const mockFunction = jest.fn();
        const html = transformer(mockBlocks, mockFunction);
        expect(mockFunction).toHaveBeenCalled();
    });
});
//# sourceMappingURL=transformer.spec.js.map