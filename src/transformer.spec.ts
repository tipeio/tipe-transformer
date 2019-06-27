import { transformer } from './transformer'
import { TransformerConstants } from './helpers/constants'
import mockBlocks from './helpers/mockBlocks'
import { IBlock } from './types'

describe('transformer', () => {
  it('should use a parser function if passed in', () => {
    const mockFunction = jest.fn()
    transformer(mockBlocks, mockFunction)
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should use multiple parser functions if passed in', () => {
    const mockFunction1 = jest.fn()
    const mockFunction2 = jest.fn()
    transformer(mockBlocks, [mockFunction1, mockFunction2])
    expect(mockFunction1).toHaveBeenCalled()
    expect(mockFunction2).toHaveBeenCalled()
  })

  it('should return the last defined value', () => {
    const mockFunction1 = jest.fn().mockReturnValue('foo')
    const mockFunction2 = jest.fn().mockReturnValue(undefined)
    const mockFunction3 = jest.fn().mockReturnValue('bar')
    const result = transformer({
      Hero: {
        apiId: 'Hero',
        blocks: [(1) as unknown as IBlock]
      }
    }, [mockFunction1, mockFunction2, mockFunction3])
    expect(result.Hero.results[0]).toBe('bar')
  })

  it('should return the last defined truthy value', () => {
    const mockFunction1 = jest.fn().mockReturnValue('foo')
    const mockFunction2 = jest.fn().mockReturnValue(undefined)
    const mockFunction3 = jest.fn().mockReturnValue(undefined)
    const result = transformer({
      Hero: {
        apiId: 'Hero',
        blocks: [(1) as unknown as IBlock]
      }
    }, [mockFunction1, mockFunction2, mockFunction3])
    expect(result.Hero.results[0]).toBe('foo')
  })
})
