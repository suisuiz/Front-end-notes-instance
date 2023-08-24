<template>
  <div>
    <WebrtcLive :liveSrc="live_src"></WebrtcLive>
  </div>
</template>

<script>
import WebrtcLive from '@/components/WebrtcLive/WebrtcLive'
export default {
  components: { WebrtcLive },
  name: 'Live',
  data() {
    return {
      live_src: '',
      host: 'zk.club077.com',
      stream: '流的ID'
    }
  },
  created() {},
  mounted() {
    this.live_src = `webrtc://${this.host}/live/${this.stream}`
  },
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
