import { transformHTML } from './transformHTML'
import { TransformerConstants } from '../../helpers/constants'

describe('transformerHTML', () => {
  // Text block
  it('should correctly transform a text block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        apiId: 'asdfasdf',
        content: `<p>sdfasdfasdf</p>`,
        type: `text`
      }]
    }
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
    expect(html).toBe(`<p>sdfasdfasdf</p>`)
  })

  // Button block
  it('should correctly transform a button block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        apiId: 'asdfasdf',
        content: `button cta`,
        type: `button`
      }]
    }
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
    expect(html).toBe(`<button>button cta</button>`)
  })

  // Image block
  it('should correctly transform an image block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        apiId: 'asdfasdf',
        content: `https://dev.cdn.tipe.io/adfasdfasdf`,
        type: `image`
      }]
    }
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
    expect(html).toBe(`<img src="https://dev.cdn.tipe.io/adfasdfasdf" />`)
  })

  // Markdown block to be handled by user

  // Code block
  it('should correctly transform an code block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        apiId: 'asdfasdf',
        content: `var tipe = clean`,
        type: `code`
      }]
    }
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
    expect(html).toBe(`<pre><code>var tipe = clean</code></pre>`)
  })
})
