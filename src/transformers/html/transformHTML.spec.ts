import { transformHTML } from './transformHTML'

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
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
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
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
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
        id: 'asdfasdf',
        content: `var tipe = clean`,
        type: `code`,
        data: {
          lang: 'javascript'
        }
      }]
    }
    const block = sectionData.blocks[0]
    const html = transformHTML(block)
    expect(html).toBe(`<pre><code class="javascript javascript-css">var tipe = clean</code></pre>`)
  })
})
