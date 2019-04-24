import { transformHTML } from './transformHTML'
import { TransformerConstants } from '../../helpers/constants'

describe('transformerHTML', () => {
  it('should correctly transform a header block', () => {
    const collectionData = {
      id: 1234,
      sections: {
        'section 1': [
          {
            type: 'header',
            data: {
              text: 'tipe.io',
              level: 2
            }
          }
        ]
      }
    }
    const html = transformHTML(collectionData)
    expect(html).toBe(`<h2>tipe.io</h2>`)
  })

  it('should correctly transform a paragraph block', () => {
    const collectionData = {
      id: 1234,
      sections: {
        'section 1': [
          {
            type: 'paragraph',
            data: {
              text: 'tipe.io'
            }
          }
        ]
      }
    }
    const html = transformHTML(collectionData)
    expect(html).toBe(`<p>tipe.io</p>`)
  })

  it('should correctly transform an unordered list block', () => {
    const collectionData = {
      id: 1234,
      sections: {
        'section 1': [
          {
            type: 'list',
            data: {
              style: 'unordered',
              items: ['tipe has improved our companies culture', 'tipe.io is my friend']
            }
          }
        ]
      }
    }
    const html = transformHTML(collectionData)
    expect(html).toBe(`<ul><li>tipe has improved our companies culture</li><li>tipe.io is my friend</li></ul>`)
  })

  it('should correctly transform an ordered list block', () => {
    const collectionData = {
      id: 1234,
      sections: {
        'section 1': [
          {
            type: 'list',
            data: {
              style: 'ordered',
              items: ['tipe has improved our companies culture', 'tipe.io is my friend']
            }
          }
        ]
      }
    }
    const html = transformHTML(collectionData)
    expect(html).toBe(`<ol><li>tipe has improved our companies culture</li><li>tipe.io is my friend</li></ol>`)
  })

  it('should correctly transform a delimiter block', () => {
    const collectionData = {
      id: 1234,
      sections: {
        'section 1': [
          {
            type: 'delimiter',
            data: {}
          }
        ]
      }
    }
    const html = transformHTML(collectionData)
    expect(html).toBe(`<hr>`)
  })

  it('should correctly transform an image block', () => {
    const collectionData = {
      id: 1234,
      sections: {
        'section 1': [
          {
            type: 'image',
            data: {
              file: {
                url: 'someurl'
              },
              caption: 'somecaption'
            }
          }
        ]
      }
    }
    const html = transformHTML(collectionData)
    expect(html).toBe(`<img src="someurl" alt="somecaption" />`)
  })
})
