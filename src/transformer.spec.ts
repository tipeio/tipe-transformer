import { transformer } from './transformer'
import { TransformerConstants } from './helpers/constants'
import * as mockBlocks from './helpers/mockBlocks.json'

describe('transformer', () => {
  it('should take a tipeParser name as a string and use the corresponding tipeParser', () => {
    const html = transformer(mockBlocks, 'html')
    expect(html.length).toBeGreaterThan(1)
  })

  it('should throw if the parser argument is a string and does not map to a tipeParser', () => {
    const htmlCaller = () => {
      return transformer(mockBlocks, 'foo')
    }

    expect(htmlCaller).toThrow(TransformerConstants.invalidParser)
  })

  it('should use a parser function if passed in', () => {
    const mockFunction = jest.fn()
    transformer(mockBlocks, mockFunction)
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should use a every parser function if array of functions passed in', () => {
    const mockFunction1 = jest.fn()
    const mockFunction2 = jest.fn()
    transformer(mockBlocks, [mockFunction1, mockFunction2])
    expect(mockFunction2).toHaveBeenCalled()
    expect(mockFunction1).toHaveBeenCalled()
  })
})
