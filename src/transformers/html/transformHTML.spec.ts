import { transformHTML } from './transformHTML'
import { TransformerConstants } from '../../helpers/constants'
import * as mockBlocks from './helpers/mockBlocks.json'

describe('transformerHTML', () => {
  it('should correctly transform a header block', () => {
    const blockData = {
      time: 1,
      blocks: [{
        type: 'header',
        data: {
          text: 'tipe.io',
          level: 2
        }
      }],
      version: ''
    }
    const html = transformHTML(blockData)
    expect(html).toBe(`<h2>tipe.io</h2>`)
  })

  it('should correctly transform a paragraph block', () => {
    const blockData = {
      time: 1,
      blocks: [{
        type: 'paragraph',
        data: {
          text: 'tipe.io',
        }
      }],
      version: ''
    }
    const html = transformHTML(blockData)
    expect(html).toBe(`<p>tipe.io</p>`)
  })

  it('should correctly transform an unordered list block', () => {
    const blockData = {
      time: 1,
      blocks: [{
        type: 'list',
        data: {
          style: 'unordered',
          items: ['tipe has improved our companies culture', 'tipe.io is my friend']
        }
      }],
      version: ''
    }
    const html = transformHTML(blockData)
    expect(html).toBe(`<ul><li>tipe has improved our companies culture</li><li>tipe.io is my friend</li></ul>`)
  })

  it('should correctly transform an ordered list block', () => {
    const blockData = {
      time: 1,
      blocks: [{
        type: 'list',
        data: {
          style: 'ordered',
          items: ['tipe has improved our companies culture', 'tipe.io is my friend']
        }
      }],
      version: ''
    }
    const html = transformHTML(blockData)
    expect(html).toBe(`<ol><li>tipe has improved our companies culture</li><li>tipe.io is my friend</li></ol>`)
  })

  it('should correctly transform a delimiter block', () => {
    const blockData = {
      time: 1,
      blocks: [{
        type: 'delimiter',
        data: {}
      }],
      version: ''
    }
    const html = transformHTML(blockData)
    expect(html).toBe(`<hr>`)
  })

  it('should correctly transform an image block', () => {
    const blockData = {
      time: 1,
      blocks: [{
        type: 'image',
        data: {
          file: {
            url: 'someurl'
          },
          caption: 'somecaption'
        }
      }],
      version: ''
    }
    const html = transformHTML(blockData)
    expect(html).toBe(`<img src="someurl" alt="somecaption" />`)
  })
})
