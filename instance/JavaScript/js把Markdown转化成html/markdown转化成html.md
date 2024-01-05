# markdown 转化成 html

## 用法

```javascript
// 页面中引用
let showdown = require('@/common/content/showdown.1.9.0.js')

// 使用
let markdownStr = 'markdown串'
let converter = new showdown.Converter()
let html_info = converter.makeHtml(markdownStr)
console.log(html_info)
```

## markdown 转 html

### Markdown.Js

```html
<script src="https://cdn.bootcdn.net/ajax/libs/markdown.js/0.5.0/markdown.min.js"></script>
<script>
  let html = markdown.toHTML('####Hello https://www.fujuhao.com')
  console.log(html)
</script>
```

### Showdown.Js

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.6.4/showdown.min.js"></script>
<script>
  let converter = new showdown.Converter()
  let html = converter.makeHtml('####Hello https://www.fujuhao.com')
  console.log(html)
</script>
```

### Marked.Js

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
  let html = marked.parse('####Hello https://www.fujuhao.com')
  console.log(html)
</script>
```

#### 使用 Marked.Js 对 A 标签和 Img 标签的解析规则重写，用于自定义标签属性

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
  var renderer = new marked.Renderer()
  renderer.link = function (href, title, text) {
    let rel = 'nofollow'
    // 本站的链接
    if (href.indexOf('https://www.fujuhao.com') >= 0) {
      rel = ''
    }
    return `<a href="${href}" title="${title}" rel="${rel}" target="_blank">${text}</a>`
  }
  renderer.image = function (href, title, text) {
    let size = title
    return `<img src="${href}" title="${title}" alt="${text}" data-size="${size}"/>`
  }
  marked.use({
    renderer: renderer,
    xhtml: true
  })
  let html = marked.parse('####Hello https://www.fujuhao.com')
  console.log(html)
</script>
```

### Turndown.Js

```html
<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
<script>
  let html = '<p>####Hello <a href="https://www.fujuhao.com" title="undefined" rel="" target="_blank">https://www.fujuhao.com</a></p>'
  // html转markdown配置
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '*',
    codeBlockStyle: 'fenced',
    emDelimiter: '*'
  })
  // 转换时要保留的标签
  turndownService.keep(['video', 'audio'])
  // 转换时需要移除的标签
  // turndownService.remove('xxx');
  var markdown = turndownService.turndown(html)
  console.log('markdown:', markdown)
</script>
```
