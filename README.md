# @tipe/transformer
Tipe transformer helpers for Javascript and Node.js
[Docs](beta.tipe.io/developers)

```js
import { transform, transformHTML, transformMarkdown } from '@tipe/transformer'
import { createClient } from '@tipe/js'

// Tipe Data
const content = transform(/* [TipeData] */, [/*plugins*/])

// With Tipe client
const Tipe = createClient({
  project: '1feeed2f-823a-4382-808f-a04ed533c915',
  key: '60cfbce5-0728-4ff2-884b-37ef8d8dde18'
})

Tipe.getPagesByProjectId({ page: 1, limit: 10, status: 'DRAFT' })
.then(data => {
  // data = []
  const content = transform(data, [transformHTML, transformMarkdown])
})

```
