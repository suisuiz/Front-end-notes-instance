# HTML

## HTML 标签

> **Demo [介绍](https://www.runoob.com/tags/html-reference.html)**
>
> - **header**  	h1  	nav
> - **main**  	h2  	section  	article  	figure  	figcaption
> - **footer**

```html
<body>
  <header>
    <h1>Training</h1>
    <nav>
      <ul>
        <li><a href="#stealth">Stealth &amp; Agility</a></li>
        <li><a href="#combat">Combat</a></li>
        <li><a href="#weapons">Weapons</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section>
        <figure>
            <img src="roundhouseDestruction.jpeg" alt="图片描述">
            <br>
            <figcaption>
                Master Camper Cat demonstrates proper form of a roundhouse kick.
            </figcaption>
        </figure>
    </section>
    <section id="stealth">
      <h2>Stealth &amp; Agility Training</h2>
      <article><h3>Climb foliage quickly using a minimum spanning tree approach</h3></article>
      <article><h3>No training is NP-complete without parkour</h3></article>
    </section>
  </main>
  <footer>&copy; 2018 Camper Cat</footer>
</body>
```



## HTML  a 标签

> [介绍](https://www.runoob.com/tags/tag-a.html)
>
> a 标签表示跳转
>
> - 文字内容这里 <a></a> 里填写
> - href  属性 ***指向跳转的目的地***
> - target  属性 ***指定链接的打开方式*** 值为 *"**_blank**"*  表示在新窗口打开

```html
<a href="https://www.baidu.com">当前窗口前往百度</a>
<a href="https://www.baidu.com" target="_blank">新窗口前往百度</a>
```

> a 标签 **锚点**  #id  与下方 id 对应

```html
<a href="#contacts-header">Contacts</a>
...
<h2 id="contacts-header">Contacts</h2>
```



## HTML  form 表单

> 提交表单 [介绍](https://www.runoob.com/tags/tag-form.html)
>
> - action  规定当提交表单时向何处发送表单数据。
> - method  发送 form-data 的 HTTP 方法  get/post
> - required  代表必填项

```html
<form action="xxx">
  <label for="indoor"><input id="indoor" type="radio" name="indoor-outdoor" value="indoor"> Indoor</label>
  <label for="outdoor"><input id="outdoor" type="radio" name="indoor-outdoor" value="outdoor"> Outdoor</label><br>
  <label for="loving"><input id="loving" type="checkbox" name="personality" value="loving"> Loving</label>
  <label for="lazy"><input id="lazy" type="checkbox" name="personality" value="lazy"> Lazy</label>
  <label for="energetic"><input id="energetic" type="checkbox" name="personality" value="energetic"> Energetic</label><br>
  <button type="submit">Submit</button>
</form>
```



## HTML  input 表

> 标签 [介绍](https://www.runoob.com/tags/tag-input.html)
>
> - required  代表必填项
> - autofocus  是否获得焦点。
> - placeholder  占位符
> - type  类型
> - - button  按钮
>   - submit  提交按钮
>   - reset  重置按钮
>   - 
>   - text 文字输入框
>   - month  年月
>   - date  日期
>   - datetime  日期加时间
>   - time  时间
>   - week  周
>   - 
>   - password  密码输入框
>   - radio 单选框
>   - checkbox 多选框
>   - url
>   - tel
>   - search
>   - email
>   - color
>   - number

```html
<input type="text" size="30" maxlength="20" placeholder="请输入搜索关键字" />
// 上面代码意思是：input元素类型为文本输入框;元素长度等于30;最多只能输入20字符;输入框中提示用户内容为“请输入搜索关键字”

<input type="password" size="10" maxlength="10"  />
// 上面代码意思是：input元素类型为密码输入框;元素长度等于10;最多只能输入10字符

男<input type="radio" value="男" name="single" />
女<input type="radio" value="女" name="single" checked />
人妖<input type="radio" value="人妖" name="single"  />
// 上面代码意思是：input元素类型为单选按钮;其中value属性中的值用来设置用户选中该项目后提交到数据库中的值；拥有相同name属性的单选框为同一组，一个组里只能同时选中一个选项；而checked属性表示的是初始选项，在用户还没进行选中之前，初始值会选中“女”这个项目

广州<input type="checkbox" value="广州" name="city" />
深圳<input type="checkbox" value="深圳" name="city" />
杭州<input type="checkbox" value="杭州" name="city" />
北京<input type="checkbox" value="北京" name="city" />
// 上面代码意思是：input元素类型为复选框;用户可以进行多个选项，其中value属性中的值用来设置用户选中该项目后提交到数据库中的值；name为控件的名称
```



## HTML  label 标签

> label 的 for 属性和 input 的 id 相对应，这样才能选中。

```html
<form>
  <label for="name">Name:
      <input type="text" id="name" name="name">
  </label>
</form>
```

