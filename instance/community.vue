<!--
 * @Descripttion: 部落
 * @LastEditTime: 2023-08-10 19:30:10
 * @FilePath: \things\pages\chat\community.vue
-->
<template>
  <view>
    <view class="store_wrap" v-if="storeData.length > 0">
      <scroll-view class="content_scroll" scroll-x>
        <view class="content_scroll_item" v-for="(item, index) in storeData" :key="index" @click="intoChat(item.roomid)">
          <view class="store_box uni-column-center" :style="{ background: storeColor[index] || '#FFD000' }">
            <view>{{ item.name }}</view>
            <image class="store_img" :src="item.logo" mode="aspectFill"></image>
            <view class="uni-flex-ali" style="margin-bottom: 10rpx">
              <image class="goods_img" v-for="(igoods, i) in item.goods.slice(0, 4)" :key="i" :src="igoods"></image>
            </view>
            <view class="uni-flex-ali">
              <image class="people_img" :src="item.people" mode="aspectFill"></image>
              <view class="store_time">{{ item.time }}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="manage_wrap" v-if="manageData.length > 0">
      <scroll-view class="content_scroll" scroll-x>
        <view class="content_scroll_item" v-for="(item, index) in manageData" :key="index">
          <view class="manage_box uni-flex-center" :style="{ background: manageColor[index] || '#FFD000' }">
            <image class="manage_img" :src="item.logo" mode="aspectFill"></image>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="note_wrap" v-if="noteData.length > 0">
      <scroll-view class="content_scroll" scroll-x>
        <view class="content_scroll_item" style="width: 100%" v-for="(item, index) in noteData" :key="index">
          <view class="note_item uni-column-center">
            <view class="note_box uni-flex-jus" v-for="(keys, i) in item" :key="i">
              <view class="content_info uni-flex-jus">
                <view class="info_box uni-column-center">
                  <image class="note_people" :src="keys.image" mode="aspectFill"></image>
                  <view class="note_name">{{ keys.name }}</view>
                  <view class="note_time">{{ keys.time }}</view>
                </view>
                <view class="content_box">
                  <view class="text_wrap">
                    <view class="text_box">{{ keys.content }}</view>
                  </view>
                  <view class="text_bottom">
                    <view class="content_ic">
                      <uni-icons type="eye" size="18" color="#C9C9C9"></uni-icons>
                      <view class="ic_text">{{ keys.look }}</view>
                    </view>
                    <view class="content_ic">
                      <uni-icons type="heart" size="18" color="#C9C9C9"></uni-icons>
                      <view class="ic_text">{{ keys.like }}</view>
                    </view>
                  </view>
                </view>
              </view>
              <image class="note_img" :src="keys.note" mode="aspectFill"></image>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="scene_wrap" v-if="sceneData.back">
      <image class="scene_back" :src="sceneData.back"></image>
      <view class="scene_top uni-flex-center">
        <view class="top_item" v-for="(item, index) in sceneData.topArr" :key="index">
          <image class="top_item_back" :src="item.car" mode="aspectFill"></image>
          <view class="top_item_text">{{ item.name }}</view>
        </view>
      </view>

      <view class="scene_bottom uni-flex-center">
        <view class="bottom_item" v-for="(item, index) in sceneData.bottomArr" :key="index">
          <image class="bottom_item_back" :src="item.scene" mode="aspectFill"></image>
          <view class="bottom_item_text uni-column-center">
            <view class="title">{{ item.title }}</view>
            <view class="time">{{ item.time }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// 引入接口
let app = require('@/common/common.js')
// 获取联系人
let getcontact = require('@/common/content/getcontact.js')
export default {
  data() {
    return {
      storeData: [],
      storeColor: ['#2FCDEB', '#9349C1', '#D60D3F', '#FE7502', '#2FCDEB', '#9349C1', '#D60D3F', '#FE7502', '#2FCDEB', '#9349C1', '#D60D3F', '#FE7502'],
      manageData: [],
      manageColor: ['#FFD000', '#3374CA', '#9349C1', '#FFD000', '#3374CA', '#9349C1'],
      noteData: [],
      sceneData: {
        back: ''
      }
    }
  },

  created() {},
  mounted() {
    this.getPageData()
  },

  methods: {
    getPageData() {
      let that = this
      let userid = uni.getStorageSync('userId')
      if (userid) {
        let url = `https://zk.club077.com/community/${userid}/info.json`
        app.geturljson(url, (res) => {
          if (res.code === 0) {
            if (res?.name) that.$emit('list_title_event', res.name)
            if (res?.data) {
              let { store, manage, note, scene } = res.data
              if (store) that.storeData = store
              if (manage) that.manageData = manage
              if (note) that.noteData = note
              if (scene) that.sceneData = scene
            }
          }
        })
      }
    },

    async intoChat(room_id) {
      if (room_id) {
        try {
          let userinfo = await getcontact.getContactById(room_id)
          let { id, type, roomid, name, appid, siteid, c3id, subtype } = userinfo
          if (!id) return
          let receiveid = id
          if (type === 5 || type === '5') receiveid = roomid
          if (subtype === 7 || subtype === '7') receiveid = id
          if (subtype === undefined) subtype = 0
          uni.navigateTo({
            url: `/pages/chat/room/chat_new?roomid=${roomid}&title=${name}&chattype=${type}&receiveid=${receiveid}&appid=${appid}&siteid=${siteid}&c3id=${c3id}&chatsubtype=${subtype}`
          })
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content_scroll {
  align-self: baseline;
  white-space: nowrap;
  width: 100%;
  .content_scroll_item {
    display: inline-block;
  }
}

.store_wrap {
  height: 270rpx;

  .store_box {
    width: 188rpx;
    height: 270rpx;
    color: #fff;
    font-size: 24rpx;

    .store_img {
      margin: 10rpx 0;
      width: 116rpx;
      height: 116rpx;
      border-radius: 8rpx;
    }

    .goods_img {
      width: 32rpx;
      height: 32rpx;
      border-radius: 4rpx;
    }

    .people_img {
      margin-right: 4rpx;
      width: 28rpx;
      height: 28rpx;
      border-radius: 100%;
      overflow: hidden;
    }
    .store_time {
      font-size: 20rpx;
    }
  }
}

.manage_wrap {
  height: 200rpx;

  .manage_box {
    width: 375rpx;
    height: 200rpx;

    .manage_img {
      width: 180rpx;
      height: 180rpx;
    }
  }
}

.note_wrap {
  height: 450rpx;
  background: #2fcdeb;

  .note_item {
    width: 100%;
    height: 450rpx;

    .note_box {
      width: 710rpx;
      height: 198rpx;
      background: #fffde6;
      box-shadow: 0 2rpx 8rpx 0 rgba(135, 135, 135, 0.39);

      .content_info {
        flex: 1;
        padding: 0 16rpx;
        box-sizing: border-box;

        .info_box {
          .note_people {
            margin-bottom: 10rpx;
            width: 80rpx;
            height: 80rpx;
            border-radius: 100%;
            border: 2rpx solid #9349c1;
          }
          .note_name {
            color: #000;
            font-size: 32rpx;
            font-family: 101;
          }
          .note_time {
            color: #000;
            font-size: 20rpx;
          }
        }

        .content_box {
          margin-left: 20rpx;
          flex: 1;

          .text_wrap {
            // width: 390rpx;
            height: 120rpx;
            border-bottom: solid 1px #e9e8d2;

            .text_box {
              color: #000;
              font-size: 20rpx;
              white-space: normal;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 4;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
          .text_bottom {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .content_ic {
              display: flex;
              align-items: center;
              margin-left: 24rpx;

              .ic_text {
                margin-left: 8rpx;
                color: #000;
                font-size: 20rpx;
              }
            }
          }
        }
      }

      .note_img {
        margin-right: 4rpx;
        width: 190rpx;
        height: 190rpx;
      }
    }

    .note_box:nth-of-type(1) {
      margin-bottom: 16rpx;
    }
  }
}

.scene_wrap {
  position: relative;
  width: 100%;
  height: 400rpx;
  background: #2fcdeb;

  .scene_back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }

  .scene_top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .top_item {
      margin-right: 8rpx;
      position: relative;
      width: 232rpx;
      height: 54rpx;

      .top_item_back {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .top_item_text {
        position: absolute;
        right: 12rpx;
        width: 134rpx;
        line-height: 54rpx;
        font-size: 20rpx;
        color: #413e1c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .scene_bottom {
    position: absolute;
    bottom: 18rpx;
    left: 0;
    width: 100%;

    .bottom_item {
      margin-right: 6rpx;
      position: relative;
      width: 232rpx;
      height: 70rpx;

      .bottom_item_back {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }

      .bottom_item_text {
        position: absolute;
        right: 4rpx;
        width: 160rpx;
        height: 70rpx;

        .title {
          font-size: 20rpx;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .time {
          font-size: 20rpx;
          color: #000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
