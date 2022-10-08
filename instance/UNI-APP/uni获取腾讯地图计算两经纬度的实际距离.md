#### `uni-app` 获取腾讯地图计算两经纬度的实际距离（可批量）

[获取腾讯地图计算两经纬度的实际距离 `api`](https://lbs.qq.com/service/webService/webServiceGuide/webServiceDistance)



![img](https://pic1.zhimg.com/80/v2-c4e91cdeab79c42d1276bb74e5a8bd68_720w.jpg)



代码

```javascript
getDistance() {
  uni.request({
    url: 'https://apis.map.qq.com/ws/distance/v1/matrix', //仅为示例，并非真实接口地址。
    method: 'GET',
    data: {
      mode: 'walking',
      from: '39.071510,117.190091',
      to: '39.108951,117.279396',
      key: '.....' //获取key
    },
    success: (res) => {
      console.log(res);
      let hw = res.data.result.rows[0].elements[0].distance; //拿到距离(米)
      if (hw && hw !== -1) {
        if (hw < 1000) {
          hw = hw + 'm';
        }
        //转换成公里
        else {
          hw = (hw / 2 / 500).toFixed(2) + 'km'
        }
      } else {
        hw = "距离太近或请刷新重试"
      }
      console.log(hw);
    }
  });
}
```

