import { transform } from './transformer'
import mockBlocks from './helpers/mockBlocks'

describe('transform', () => {
  it('should use a parser function if passed in', () => {
    const mockFunction = jest.fn()
    transform(mockBlocks, mockFunction)
    expect(mockFunction).toHaveBeenCalled()
  })

  it('should use multiple parser functions if passed in', () => {
    const mockFunction1 = jest.fn()
    const mockFunction2 = jest.fn()
    transform(mockBlocks, [mockFunction1, mockFunction2])
    expect(mockFunction1).toHaveBeenCalled()
    expect(mockFunction2).toHaveBeenCalled()
  })

  it('should return the last defined value', () => {
    const mockFunction1 = jest.fn().mockReturnValue('foo')
    const mockFunction2 = jest.fn().mockReturnValue(undefined)
    const mockFunction3 = jest.fn().mockReturnValue('bar')
    const apiId = 'Hero'
    const result = transform([
      {
        name: 'Hero',
        apiId,
        blocks: [{
          id: 'title',
          content: '<h1>Tipe CMS</h1>',
          type: 'text'
        }]
      }
    ], [mockFunction1, mockFunction2, mockFunction3])
    expect(result[apiId].blocks[0].result).toBe('bar')
  })

  it('should return the last defined truthy value', () => {
    const mockFunction1 = jest.fn().mockReturnValue('foo')
    const mockFunction2 = jest.fn().mockReturnValue(undefined)
    const mockFunction3 = jest.fn().mockReturnValue(undefined)
    const apiId = 'Hero'
    const result = transform([
      {
        name: 'Hero',
        apiId,
        blocks: [{
          id: 'title',
          content: '<h1>Tipe CMS</h1>',
          type: 'text'
        }]
      }
    ], [mockFunction1, mockFunction2, mockFunction3])
    expect(result[apiId].blocks[0].result).toBe('foo')
  })

  it('should return the original block and result', () => {
    const mockFunction1 = jest.fn().mockReturnValue('foo')
    const mockFunction2 = jest.fn().mockReturnValue(undefined)
    const mockFunction3 = jest.fn().mockReturnValue(undefined)
    const apiId = 'Hero'
    const block = {
      id: 'title',
      content: '<h1>Tipe CMS</h1>',
      type: 'text'
    }
    const result = transform([
      {
        name: 'Hero',
        apiId,
        blocks: [block]
      }
    ], [mockFunction1, mockFunction2, mockFunction3])
    expect(result[apiId].blocks[0].result).toBe('foo')
    expect(result[apiId].blocks[0].block).toBe(block)
  })

  it('should format the sections to be keyed by apiId', () => {
    const mockFunction1 = jest.fn().mockReturnValue('foo')
    const mockFunction2 = jest.fn().mockReturnValue(undefined)
    const mockFunction3 = jest.fn().mockReturnValue(undefined)
    const apiId = 'Hero'
    const result = transform([
      {
        name: 'Hero',
        apiId,
        blocks: [{
          id: 'title',
          content: '<h1>Tipe CMS</h1>',
          type: 'text'
        }]
      }
    ], [mockFunction1, mockFunction2, mockFunction3])
    expect(result[apiId]).toBeTruthy()
  })
})
