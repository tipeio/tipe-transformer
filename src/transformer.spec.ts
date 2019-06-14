import { transformer } from './transformer'
import { TransformerConstants } from './helpers/constants'
import * as mockBlocks from './helpers/mockBlocks.json'
import { stringLiteral, identifier } from '@babel/types';

describe('transformer', () => {
  it('should take a tipeParser name as a string and use the corresponding tipeParser', async () => {
    const html = await transformer(mockBlocks, 'html')
    expect(html.result.length).toBeGreaterThan(1)
  })

  it('should throw if the parser argument is a string and does not map to a tipeParser', async () => {
    const htmlCaller = async () => {
      await transformer(mockBlocks, 'foo')
    }

    await expect(htmlCaller()).rejects.toThrow(new Error(TransformerConstants.invalidParser))
  })

  it('should use a parser function if passed in', () => {
    const mockFunction = jest.fn()
    transformer(mockBlocks, mockFunction)
    expect(mockFunction).toHaveBeenCalled()
  })

})
