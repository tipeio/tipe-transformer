export const transformHTML = (data) => {
    return data.blocks.reduce((html, block) => {
        let element;
        const listTypes = {
            ordered: 'ol',
            unordered: 'ul'
        };
        switch (block.type) {
            case 'header':
                const { level, text } = block.data;
                element = `<h${level}>${text}</h${level}>`;
                break;
            case 'paragraph':
                element = `<p>${block.data.text}</p>`;
                break;
            case 'list':
                const { items, style } = block.data;
                if (!items)
                    throw new Error('items not defined!');
                if (!style)
                    throw new Error('style not defined!');
                const type = listTypes[style];
                const li = items
                    .map((i) => `<li>${i}</li>`)
                    .join('');
                element = `<${type}>${li}</${type}>`;
                break;
            case 'delimiter':
                element = '<hr>';
                break;
            case 'image':
                const { file, caption } = block.data;
                if (!file)
                    throw new Error('file not defined!');
                element = `<img src="${file.url}" alt="${caption}" />`.replace(/\\"/g, '"');
                break;
            default:
                element = '';
                break;
        }
        return html + element;
    }, '');
};
//# sourceMappingURL=transformHTML.js.map