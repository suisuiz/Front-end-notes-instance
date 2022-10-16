## `vue` 实现文件上传

>  本文主要介绍 `input` 标签实现的文件上传

`input` 标签上传也有两种写法

### 一、隐藏 `input` 标签

将 `input` 标签定位到上传文件的按钮处，同时将其隐藏
 `<input type="file" id="file" onchange="changeFile(this)"/>`

```
<body>
  <input type="file" id="file" onchange="changeFile(this)" style="position: absolute; top: 8; left: 8; opacity: 0"/>
  <button>文件上传</button>
  <script>
    function changeFile(el) {
      const files = el.files;
       console.log('上传的文件：', files);
    }
  </script>
</body>
```



### 二、动态创建 `input` 标签（推荐）

**文件类型、文件大小、单/多文件** 的功能均已实现

```
<body>
  <button onclick="fileUploadNode(getUploadFileEvt, {isMultiple: true, acceptType: '.zip', acceptTypeErrMsg: '只能支持上传zip', limitSize: 200 * 1024 * 1024})">input文件上传</button>
  <script>
    /**
     * 判断文件名是否是指定类型
     * @param {String} fileName - 文件名
     * @param {String} acceptType - 接受的文件类型 '.zip,.rar,.doc'
     * @param {String} [type] - 文件类型 acceptType="image/*"时，需要此参数
     */
    const isSpecifyFileType = (fileName, acceptType, type) => {
      const pointIndex = fileName.lastIndexOf('.');
      const fileType = fileName.slice(pointIndex);
      if (acceptType === 'image/*') return type.startsWith('image/');
      if (acceptType !== 'image/*') {
        const accept = acceptType.split(',');
        return accept.includes(fileType);
      }
    };
    // 格式化字节 bytes单位B
    const formatByteSize = (bytes) => {
      if (!bytes) return '0B';
      const unitList = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const index = Math.floor(Math.log(bytes) / Math.log(1024));
      const size = (bytes / Math.pow(1024, index)).toFixed(2);
      return `${size}${unitList[index]}`;
    };
    // 检测文件类型
    function checkFileType(files, acceptType) {
      const length = files.length;
      for (let i = 0; i < length; i++) {
        if (!isSpecifyFileType(files[i].name, acceptType, files[i].type)) return false;
      }
      return true;
    }
    // 检测文件大小
    function checkFileSize(files, size) {
      let sizeTotal = 0;
      for (const item of files) {
        sizeTotal += item.size;
        if (item.size > size || sizeTotal > size) return false;
      }
      return true;
    }
    /**
     * 使用input标签属性上传文件
     * @param {Function} cb - 回调函数
     * @param {Object} config - 配置项
     */
    function fileUploadNode(cb, config) {
      const _config = Object.assign({
        isMultiple: false,                // 是否多文件上传
        acceptType: '',                   // 接受的文件类型
        acceptTypeErrMsg: '文件类型错误',  // 文件类型错误提示语
        limitSize: 0                      // 文件大小限制
      }, config);
      const input = document.createElement('input');
      input.style = 'display: block; width: 0; height: 0; padding: 0; border: 0;';
      input.setAttribute('type', 'file');
      input.setAttribute('name', 'file');
      _config.isMultiple && input.setAttribute('multiple', _config.isMultiple);
      _config.acceptType && input.setAttribute('accept', _config.acceptType);
      document.body.appendChild(input);

      input.addEventListener('change', (e) => {
        const files = e.target.files;
        // 检测文件大小
        if (_config.limitSize && !this.checkFileSize(files, _config.limitSize)) {
          alert(`只能上传${formatByteSize(_config.limitSize)}的文件`);
          return;
        }
        // 检测文件类型
        if (_config.acceptType && !this.checkFileType(files, _config.acceptType)) {
          alert(_config.acceptTypeErrMsg);
          return;
        }
        cb(files);
        setTimeout(() => {
          document.body.removeChild(input);
        });
      });

      // 需要主动调用click事件，才能弹出文件选择框
      input.click();
    }
    function getUploadFileEvt(files) {
      alert('朋友，获取到上传的文件了，请看控制台');
      console.log(files);
      uploadFileEvt('http://192.168.66.183:13666/upload', {file: files});
    }
    // 根据header里的contenteType转换请求参数
    function transformRequestData(contentType, requestData) {
      requestData = requestData || {};
      if (contentType.includes('application/x-www-form-urlencoded')) {
        // formData格式：key1=value1&key2=value2，方式二：qs.stringify(requestData, {arrayFormat: 'brackets'}) -- {arrayFormat: 'brackets'}是对于数组参数的处理
        let str = '';
        for (const key in requestData) {
          if (Object.prototype.hasOwnProperty.call(requestData, key)) {
            str += `${key}=${requestData[key]}&`;
          }
        }
        return encodeURI(str.slice(0, str.length - 1));
      } else if (contentType.includes('multipart/form-data')) {
        const formData = new FormData();
        for (const key in requestData) {
          const files = requestData[key];
          // 判断是否是文件流
          const isFile = files ? files.constructor === FileList || (files.constructor === Array && files[0].constructor === File) : false;
          if (isFile) {
            for (let i = 0; i < files.length; i++) {
              formData.append(key, files[i]);
            }
          } else {
            formData.append(key, files);
          }
        }
        return formData;
      }
      // json字符串{key: value}
      return Object.keys(requestData).length ? JSON.stringify(requestData) : '';
    }
    /**
     * ajax实现文件下载、获取文件下载进度
     * @param {String} url
     * @param {Object} [params] - 请求参数，{name: '文件下载'}
     * @param {Object} [config] - 方法配置
     */
     function uploadFileEvt(url, params, config) {
      const _config = Object.assign({
        contentType: 'multipart/form-data',	// 请求头类型
        token: 'token'	// 用户token
      }, config);

      const queryParams = transformRequestData(_config.contentType, params);

      const ajax = new XMLHttpRequest();
      ajax.open('post', url, true);
      ajax.setRequestHeader('Authorization', _config.token);
      // 不能设置content-type - 后端接收的时候需要multipart/form-data; boundary=----WebKitFormBoundaryALLEekH0L0BdZLO3（boundary是自己生成的）
      // ajax.setRequestHeader('Content-Type', _config.contentType);

      // 获取文件上传进度 -- 异步才会触发，若ajax为同步则不会触发进度监听
      ajax.upload.addEventListener('progress', (progress) => {
        const percentage = ((progress.loaded / progress.total) * 100).toFixed(2);
        const msg = `上传进度 ${percentage}%...`;
        console.log(msg);
      }, false);
      ajax.onload = function () {
       if (this.status === 200 || this.status === 304) {
          const result = JSON.parse(this.response || '{status: 500}');
          if (result.status === 200) {
            alert('文件上传成功');
          } else {
            alert('服务器出现问题，请联系管理员');
          }
        } else {
          alert('服务器出现问题，请联系管理员');
        }
      };
      // send(string): string：仅用于 POST 请求
      ajax.send(queryParams);
    }
  </script>
</body>
```