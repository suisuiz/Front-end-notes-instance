## vue判断安卓还是IOS



### 最近工作上遇到这样一个需求

vue写的页面，需要同时跟安卓和ios进行交互；

- 若是安卓，执行代码：android.finishActivity();
- 若是IOS，执行代码：

```
try { 
 window.webkit.messageHandlers.finishActivity.postMessage(""); 
 }catch(error) { 
 console.log('WKWebView post message');
}
```



### 所以我们需要进行一个判断

是安卓还是IOS：因为是做的单独的APP所以没有考虑微信的问题

```
finishActivity() {
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; 
        //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        
          if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            //ios
            console.log(" 我是ios")
            //这里是和IOS商量好的写法，调用IOS的finishActivity方法
            try { 
              window.webkit.messageHandlers.finishActivity.postMessage(""); 
            }catch(error) { 
                console.log('WKWebView post message');
              }
          } else(/(Android)/i.test(navigator.userAgent)) {
            //android
            console.log("我是android")
            //这里是和安卓商量好的写法，调用安卓的finishActivity方法
            android.finishActivity();            
          }       
  }
```

然后就可以一个页面同时给安卓和IOS进行交互啦！ 



## H5端判断安卓跟ios显示不同的背景图

html:

```
<div :class="`${isApple==true ? 'index-cont-phone' : 'index-cont'}`" ></div>
```

css:

```
    .index-cont{
        width: 100%;
        height: auto;
        min-height: 100vh;
        overflow-x:hidden;
        background: url("https://tuoluohuodong.oss-cn-shenzhen.aliyuncs.com/interaction_h5/main_bg3.png") no-repeat;
        background-size: contain;
        margin: 0;
        padding-bottom: 199%;
        // position: fixed;
    }
    .index-cont-phone{
        width: 100%;
        height: auto;
        min-height: 100vh;
        overflow-x:hidden;
        background: url("https://tuoluohuodong.oss-cn-shenzhen.aliyuncs.com/interaction_h5/main_bg4.png") no-repeat;
        background-size: contain;
        margin: 0;
        padding-bottom: 199%;
        // position: fixed;
    }
```

js:

```
<script>
export default {
    name: "index",
    data() {
        return {
            isApple:true,
                }
            },
     },
     methods: {
       // 判断是安卓还是ios
        appDown() {
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isiOS){
                this.isApple = true
            }else if(isAndroid){
                this.isApple = false
            }
       },
   mounted() {
          // 调用判断ios与安卓方法
        this.appDown();
    },
 }
</script>
```