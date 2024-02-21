# js 替换字符串

### 替换单个字符串

> 通常 JavaScript 的 String replace() 函数只会替换它在字符串中找到的第一个匹配的子符：

```javascript
const myMessage = 'this is the sentence to end all sentences'
const newMessage = myMessage.replace('sentence', 'message')
console.log(newMessage) // this is the message to end all sentences
// 仅替换第一个 sentence => message
```

### 替换多个字符串

> 如果希望 JavaScript 能够替换所有子串，必须通过 /g 运算符使用正则表达式：

```javascript
const myMessage = 'this is the sentence to end all sentences'
const newMessage = myMessage.replace(/sentence/g, 'message')
console.log(newMessage) // this is the message to end all messages
// 替换所有 sentence => message
```

> 除了使用内联 /g 之外，还可以使用 RegExp 对象的构造函数：

````javascript
const myMessage = 'this is the sentence to end all sentences'
const newMessage = myMessage.replace(new RegExp('sentence', 'g'), 'message')
console.log(newMessage) // this is the message to end all messages```
````

### 替换特殊字符

> 要替换特殊字符，例如 -/\\^$\*+?.()|[]{})，需要使用反斜杠对其转义。
> 如果给定字符串 this[]is[]my[]url，要求把所有转义的（[]）替换为空格。
> 可以用 replace() 做到：

```javascript
const myUrl = 'this[]is[]my[]url'
const newUrl = myUrl.replace(/\[]/g, ' ')
console.log(newUrl) // this is my url
```
