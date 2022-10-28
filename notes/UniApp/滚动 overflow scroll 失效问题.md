在uni-popup使用overflow：scroll失效问题。

原因：uni-popup最外层设置了@touchmove.stop.prevent="clear"，禁止内部滑动，导致滑动没有效果。

结果：去掉@touchmove.stop.prevent 即可。