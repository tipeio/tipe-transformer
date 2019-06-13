import { transformHTML } from './transformHTML'
import { TransformerConstants } from '../../helpers/constants'

describe('transformerHTML', () => {
  // Text block
  it('should correctly transform a text block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        id: 'asdfasdf',
        content: `<p>sdfasdfasdf</p>`,
        type: `text`
      }]
    }
    const html = transformHTML(sectionData)
    expect(html).toBe(`<p>sdfasdfasdf</p>`)
  })

  // Button block
  it('should correctly transform a button block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        id: 'asdfasdf',
        content: `button cta`,
        type: `button`
      }]
    }
    const html = transformHTML(sectionData)
    expect(html).toBe(`<button>button cta</button>`)
  })

  // Image block
  it('should correctly transform an image block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        id: 'asdfasdf',
        content: `https://dev.cdn.tipe.io/adfasdfasdf`,
        type: `image`
      }]
    }
    const html = transformHTML(sectionData)
    expect(html).toBe(`<img src="https://dev.cdn.tipe.io/adfasdfasdf" />`)
  })

  // Markdown block to be handled by user

  // Code block
  it('should correctly transform an code block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        id: 'asdfasdf',
        content: `var tipe = clean`,
        type: `code`
      }]
    }
    const html = transformHTML(sectionData)
    expect(html).toBe(`<pre><code>var tipe = clean</code></pre>`)
  })
})
