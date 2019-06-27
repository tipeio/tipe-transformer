import { transformMarkdown } from './transformMarkdown'

describe('transformMarkdown', () => {
  it('should correctly transform a markdown block', () => {
    const sectionData = {
      apiId: 'asdfasdf',
      blocks: [{
        id: 'asdfasdf',
        content: `### header 3`,
        type: `markdown`
      }]
    }
    const block = sectionData.blocks[0]
    const html = transformMarkdown(block)
    expect(html).toBe(`<h3 id="header3">header 3</h3>`)
  })
})
