<template>
	<view class="container" id="container" :style="skin_style">
		<view class="container-header" id="header">
			<u-navbar class="container-navbar" :title="pageTitle" :is-fixed="false" :border-bottom="false">
				<view class="container-navbar-right" slot="right" @click="actionSheetShow=true;">···</view>
			</u-navbar>
			<view class="container-goods u-flex u-col-center" v-if="msg_obj.pro_id > 0 && pro_mes.name">
				<view class="container-goods-img">
					<u-image width="100%" height="100%" lazy-load fade :src="pro_mes.img">
						<u-loading slot="loading"></u-loading>
						<u-loading slot="error" color="red"></u-loading>
					</u-image>
				</view>
				<view>
					<view class="container-goods-title">{{pro_mes.name}}</view>
					<view class="container-goods-price">当前价￥{{pro_mes.current_bid_price}}</view>
				</view>
			</view>
		</view>

		<view class="container-chat" id="messageList">
			<view v-for="(item, index) in messageList" :key="index">
				<!-- 对话用户 -->
				<view class="container-chat-item" v-if="item.from&&item.from.user_id==to_user_id">
					<view class="container-chat-item-time" v-if="item.is_show_time==1">{{item.createtime}}</view>
					<view class="container-chat-item-content left u-flex u-col-center" v-if="item.content">
						<view class="container-chat-item-content-img"
							@click.stop="handelGoLink(`/pages/user/homePage?t_user_id=${item.from.user_id}`)">
							<u-image width="100%" height="100%" lazy-load fade shape="circle"
								:src="to_user_mes.headimg">
								<u-loading slot="loading"></u-loading>
								<u-loading slot="error" color="red"></u-loading>
							</u-image>
						</view>
						<view class="container-chat-item-content-text" v-if="item.content.type=='text'">
							<text>{{item.content.content}}</text>
						</view>

						<view class="container-chat-item-content-img-box" v-if="item.content.type=='img'">
							<u-image width="100%" height="100%" lazy-load fade :src="item.content.content">
								<u-loading slot="loading"></u-loading>
								<u-loading slot="error" color="red"></u-loading>
							</u-image>
						</view>

						<view class="container-chat-item-content-voice-box-left" v-if="item.content.type=='voice'">
							<view class="container-chat-item-content-voice-box-left-item"
								@tap.stop="playVoice(item.content.content, item.content)"
								v-bind:style="{width: voiceWith(item.content.sec) + '%'}">
								<text
									class="container-chat-item-content-voice-box-item-left-text">{{item.content.sec}}"</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 自己 -->
				<view class="container-chat-item" v-else>
					<view class="container-chat-item-time" v-if="item.is_show_time==1">{{item.createtime}}</view>
					<view class="container-chat-item-content right u-flex u-col-center" v-if="item.content">
						<view class="container-chat-item-content-text" v-if="item.content.type=='text'">
							<text>{{item.content.content}}</text>
						</view>

						<view class="container-chat-item-content-img-box" v-if="item.content.type=='img'"
							@click="handelPreviewImages(index)">
							<u-image width="100%" height="100%" lazy-load fade :src="item.content.content">
								<u-loading slot="loading"></u-loading>
								<u-loading slot="error" color="red"></u-loading>
							</u-image>
						</view>

						<view class="container-chat-item-content-voice-box-right" v-if="item.content.type=='voice'">
							<view class="container-chat-item-content-voice-box-right-item"
								@tap.stop="playVoice(item.content.content, item.content)"
								v-bind:style="{width: voiceWith(item.content.sec) + '%'}">
								<text
									class="container-chat-item-content-voice-box-right-item-text">{{item.content.sec}}"</text>
							</view>
						</view>
						<view class="container-chat-item-content-img">
							<u-image width="100%" height="100%" lazy-load fade shape="circle" :src="user_mes.headimg">
								<u-loading slot="loading"></u-loading>
								<u-loading slot="error" color="red"></u-loading>
							</u-image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<message-footer class="container-footer" ref="messageFooter" @change="handelCommentsChange"
			@photo="handelPhotoChange" @shoot="handelShootChange" @voiceTouchend="handelVoiceTouchend"
			@focus="handelFocusChange">
		</message-footer>

		<u-action-sheet class="container-action" :list="actionSheetList" v-model="actionSheetShow"
			safe-area-inset-bottom border-radius="40" @click="handelActionSheetChange"></u-action-sheet>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import messageFooter from '@/components/content/message/footer'
	import {browser} from "@/utils"
	import {
		is_blacklist,
		add_remove_blacklist
	} from "@/api/user.js"
	const innerAudioContext = uni.createInnerAudioContext()
	// const amrToMp3 = require('amrToMp3')
	// import BenzAMRRecorder from 'benz-amr-recorder'
	// const amrToMp3 = require('amr_to_mp3_sx')
	export default {
		components: {
			messageFooter
		},
		data() {
			return {
				http_host: this.globalData.http_host,
				actionSheetList: [{
						text: '进入主页',
						color: '#000',
						fontSize: '34rpx'
					},
					{
						text: '加入黑名单',
						color: '#000',
						fontSize: '34rpx'
					}
				],
				actionSheetShow: false, //操作菜单 弹出层
				pageTitle: '',
				to_user_id: 0, // 对话用户
				pro_id: 0, // 拍品id
				last_day: 0, // 最后查询到得对话记录天
				last_index: 0, // 最后查询到得对话记录索引
				last_date: 0,
				to_user_mes: {
					// 对话用户信息
					weixin_name: '',
					headimg: '',
					user_id: 0,

				},
				shield: "1", //大于0 为已拉黑
				user_mes: {
					// 当前用户信息
					weixin_name: '',
					headimg: '',
					user_id: 0
				},
				msg_obj: {
					// 对话记录数据
					pro_id: 0, // 拍品标识
					user_a: 0, // 自己
					user_b: 0
				},
				pro_mes: {
					// 拍品数据
					// current_bid_price: "190.00",
					// img: "5327/pet_auction/product_type/202108/16302927879723459581228.png",
					// mark: "202108132",
					// name: "售后（双倍押金）ddd",
					// start_price: "150.00",
				},
				imgList: [], //图片
				messageList: [
					// {
					// 	content : {
					// 		content: "123465798",
					// 		ext: "",
					// 		type: "text",
					// 	},
					// 	createtime: "14:59",
					// 	date: "2021-08-30 14:59:53",
					// 	from : {
					// 		headimg: "",
					// 		user_id: "324989059",
					// 		weixin_name: "蒋鑫",
					// 	},
					// }
				], // 对话数据
				is_DownRefresh: false, //是否下拉加载更多
				messageListHeight: 0, //聊天内容高度
				inputFocus: false, //输入框焦点
			}
		},
		watch: {
			messageList: {
				handler(val, oldVal) {
					if (val.length >= oldVal.length && !this.is_DownRefresh) {
						this.$refs.messageFooter.emojiShow = false
						this.$refs.messageFooter.featureShow = false
					}
					let imgList = val.filter(item => item.content && item.content.type == 'img')
					imgList = imgList.map(item => {
						return item.content.content
					})
					//图片预览imgList
					this.imgList = imgList
					this.is_DownRefresh = false
					this.$nextTick(() => {
						this.setMessageListHeight();
					})
				},
				deep: true
			},
			to_user_mes: { //对方信息
				handler(val, oldVal) {
					if (val.user_id) {
						//是否拉黑 
						is_blacklist({
							b_user_id: val.user_id
						}, false).then(res => {
							this.shield = res.data
						}).catch(error => {
							console.log(error);
						})
					}
				},
				deep: true
			},
			shield: {
				handler(val, oldVal) {
					if (val == 0) {
						this.actionSheetList[1].text = "加入黑名单"
					} else {
						this.actionSheetList[1].text = "解除黑名单"
					}
				},
				deep: true
			}
		},
		computed: {
			...mapGetters({
				skin_style: 'skin_style'
			}),
			// 消息框的长度
			voiceWith() {
				return function(val) {
					if (isNaN(val)) {
						return 100
					}
					val = Math.floor(parseFloat(val))
					let percent = (val / 15) * 100
					if (percent < 20) {
						percent = 20
					}
					return percent
				}
			},
		},
		onLoad(options) {
			const that = this
			let {
				pro_id,
				to_user_id
			} = options
			if (!to_user_id) {
				this.$Router.back(1);
			}
			that.to_user_id = to_user_id
			that.pro_id = pro_id
			if (this.$socket) {
				this.$socket.setMessageCallback(this.messageCallback)
				setTimeout(() => {
					// 消息已阅
					that.$socket.send({
						func_name: 'message_readed',
						param: {
							to_user_id: that.to_user_id
						}
					})
					// 获取对话双方信息
					that.$socket.send({
						func_name: 'get_user_mes',
						param: {
							to_user_id: that.to_user_id,
							pro_id: this.pro_id
						}
					})
					// 获取对话列表
					that.$socket.send({
						func_name: 'get_msg_history',
						param: {
							to_user_id: that.to_user_id,
							last_day: that.last_day,
							last_index: that.last_index,
							last_date: that.last_date
						}
					})
				}, 500)
			}
			this.$wx.getJsConfig(["uploadVoice", "downloadVoice", "playVoice", "pauseVoice", "onVoicePlayEnd"]);
		},
		// 下拉加载
		onPullDownRefresh() {
			const that = this
			this.is_DownRefresh = true
			// 获取对话列表
			that.$socket.send({
				func_name: 'get_msg_history',
				param: {
					to_user_id: that.to_user_id,
					last_day: that.last_day,
					last_index: that.last_index,
					last_date: that.last_date
				}
			})
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		methods: {
			//输入焦点
			handelFocusChange(e) {
				const _this = this;
				_this.setMessageListHeight(e.height);
			},
			//设置聊天内容滚动高度
			setMessageListHeight(height = 0) {
				const _this = this;
				const query = uni.createSelectorQuery().in(_this);
				query.select('#messageList').boundingClientRect(data => {
					_this.messageListHeight = data.height
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: data.height + height + Math.random(),
							duration: 100
						})
					}, 800)
				}).exec();
			},
			//跳转页面
			handelGoLink(path) {
				this.$Router.push(path)
			},
			//操作菜单
			handelActionSheetChange(e) {
				let {
					to_user_id, //对方用户编号
					shield
				} = this;
				if (e == 0) {
					this.$Router.push({
						path: '/pages/user/homePage',
						query: {
							t_user_id: to_user_id
						}
					})
				} else if (e == 1) {
					let type = (shield != 0 ? '2' : '1')
					add_remove_blacklist(
						to_user_id,
						type
					).then(res => {
						this.shield = type == '2' ? '0' : '1'
						uni.showToast({
							title: `${type=='2'?'解除成功':'拉黑成功'}`,
							icon: 'none'
						})
					}).catch(error => {
						uni.showToast({
							title: error.errmsg,
							icon: 'none'
						})
					})
				}
			},
			//图片预览
			handelPreviewImages(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index
				})
			},
			// 消息接收
			messageCallback(data) {
				switch (data.func_name) {
					// 获取消息记录
					case 'get_msg_history':
						uni.stopPullDownRefresh()
						if (data.data.list.length <= 0) return
						let messageList = JSON.parse(JSON.stringify(this.messageList))
						if (messageList.length > 0) {
							// 比较一下当前数据中时间最早的一条，和这一次获取到的数据中时间最晚的一条，是否相差过10分钟
							let time1 = new Date(messageList[0]['date']).getTime()
							let time2 = new Date(data.data.list[data.data.list.length - 1]['date']).getTime()
							let is_show_time = 1
							if ((time1 - time2) / 1000 < 600) {
								is_show_time = 0
							}
							messageList[0]['is_show_time'] = is_show_time
						}
						messageList = [...data.data.list, ...messageList]
						this.messageList = messageList
						this.last_day = data.data.last_day
						this.last_date = data.data.last_date
						this.last_index = data.data.last_index
						break
						// 获取会话双方信息
					case 'get_user_mes':
						this.user_mes = data.data.user
						this.to_user_mes = data.data.to_user
						this.msg_obj = data.data.user_msg
						this.pro_mes = data.data.pro_mes
						this.pageTitle = this.to_user_mes.weixin_name
						break
						// 接收到发送的消息
					case 'send_msg':
						// 计算当前消息是否需要显示时间
						let _date = new Date()
						let now_time = _date.getTime(data.data.date)
						let is_show_time = 1
						if (this.messageList.length > 0) {
							let pre_time = _date.getTime(this.messageList[this.messageList.length - 1]['date'])
							if ((now_time - pre_time) / 1000 < 600) {
								is_show_time = 0
							}
						}
						data.data.is_show_time = is_show_time
						this.messageList.push(data.data.msg)
						break
					case 'media_upload':
						// 播放录音
						this.$wx.downloadVoice({
							serverId: data.data.media_id, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
							isShowProgressTips: 0, // 默认为1，显示进度提示
							success: (res) => {
								let localId = res.localId; // 返回音频的本地ID
								this.$wx.playVoice({
									localId
								});
							}
						});
				}
			},
			//文字消息
			handelCommentsChange(e) {
				if (e) {
					this.$socket.send({
						func_name: 'send_msg',
						param: {
							content: {
								// 消息内容
								type: 'text', // text:文本消息 img:图片消息 voice 语音消息
								content: e, // 文本内容或 图片和语音为二进制流
								ext: '' // 图片/语音格式
							},
							to_user_id: this.to_user_id
						}
					})
				}
			},
			//语音结束
			handelVoiceTouchend(e) {
				const that = this
				if (!e.path) return
				// #ifndef H5
				this.Audio2dataURL(e).then(res => {
					// 转化后的base64图片地址
					that.$socket.send({
						func_name: 'send_msg',
						param: {
							content: {
								// 消息内容
								type: 'voice', // text:文本消息 img:图片消息 voice 语音消息
								content: res, // 文本内容或 图片和语音为二进制流
								ext: 'mp3', // 图片/语音格式
								sec: e['sec'] //语音秒数 
							},
							to_user_id: that.to_user_id
						}
					})
				})
				// #endif

				// #ifdef H5
				if (browser.versions.weixin) {
					that.$socket.send({
						func_name: 'send_msg',
						param: {
							content: {
								// 消息内容
								type: 'voice', // text:文本消息 img:图片消息 voice 语音消息
								content: e.path, // 文本内容或 图片和语音为二进制流 id
								ext: 'media_id', // 图片/语音格式 media_id
								sec: e.sec //语音秒数 0
							},
							to_user_id: that.to_user_id
						}
					})
				}
				// #endif										
			},
			// 播放语音
			playVoice(src, voice_wx) {
				// #ifndef H5
				innerAudioContext.stop()
				innerAudioContext.src = src
				innerAudioContext.onPlay(() => {})
				innerAudioContext.play()
				// #endif
				
				// #ifdef H5
				if (voice_wx.ext == 'media_id') {	
					this.$socket.send({
						func_name: 'media_upload',
						param: {
							media_url: voice_wx.content,
							to_user_id: this.to_user_id
						}
					})				
				}
				// #endif				
			},
			//相册回调
			handelPhotoChange(e) {
				const that = this
				for (let i in e) {
					this.Audio2dataURL(e[i]).then(res => {
						// 转化后的base64图片地址
						that.$socket.send({
							func_name: 'send_msg',
							param: {
								content: {
									// 消息内容
									type: 'img', // text:文本消息 img:图片消息 voice 语音消息
									content: res, // 文本内容或 图片和语音为二进制流
									ext: e[i]['type'] // 图片/语音格式
								},
								to_user_id: that.to_user_id
							}
						})
					})
				}
			},
			//拍摄回调
			handelShootChange(e) {
				const that = this
				this.Audio2dataURL(e[0]).then(res => {
					// 转化后的base64图片地址
					that.$socket.send({
						func_name: 'send_msg',
						param: {
							content: {
								// 消息内容
								type: 'img', // text:文本消息 img:图片消息 voice 语音消息
								content: res, // 文本内容或 图片和语音为二进制流
								ext: e[0]['type'] // 图片/语音格式
							},
							to_user_id: that.to_user_id
						}
					})
				})
			},
			/**
			 * 文件转base64字符串
			 * @param {Object} path
			 */
			Audio2dataURL(e) {
				// #ifdef APP-PLUS
				return new Promise((resolve, reject) => {
					plus.io.resolveLocalFileSystemURL(e.path, function(entry) {
						entry.file(
							function(file) {
								var reader = new plus.io.FileReader()
								reader.onloadend = function(e) {
									resolve(e.target.result)
								}
								reader.onerror = function(e) {}
								reader.readAsDataURL(file)
							},
							function(e) {
								uni.showToast({
									title: '文件上传失败',
									icon: 'none'
								})
							}
						)
					})
				})
				// #endif

				// #ifdef H5
				var reader = new FileReader()
				var imgUrlBase64 = reader.readAsDataURL(e)
				var AllowImgFileSize = 2100000
				return new Promise((resolve, reject) => {
					reader.onload = function(re) {
						if (AllowImgFileSize != 0 && AllowImgFileSize < reader.result.length) {
							uni.showToast({
								title: '图片过大',
								icon: 'none'
							})
							return
						} else {
							//执行上传操作
							resolve(reader.result)
						}
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}
</style>
<style lang="scss" scoped>
	.container {
		&-header {
			position: sticky;
			top: 0;
			left: 0;
			z-index: 99;
		}

		&-navbar {
			&-right {
				margin-right: 40rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #000;
			}
		}

		&-goods {
			width: 100%;
			height: 200rpx;
			padding: 30rpx;
			background-color: #fff;
			z-index: 99;

			&-img {
				height: 140rpx;
				width: 140rpx;
				margin-right: 20rpx;
			}

			&-title {
				padding: 10rpx 0;
				font-size: 30rpx;
				color: #333;
			}

			&-price {
				font-size: 32rpx;
				font-weight: bold;
				color: $skin-price-color;
			}
		}

		&-chat {
			padding-bottom: 98rpx;

			&-item {
				&-time {
					padding: 25rpx 0;
					font-size: 28rpx;
					color: #666;
					text-align: center;
				}

				&-content {
					// width: 90%;
					padding: 20rpx 0;

					.left {
						// margin-right: 10%;
						justify-content: flex-start;
					}

					&.right {
						// margin-left: 10%;
						justify-content: flex-end;
					}

					&-img {
						height: 80rpx;
						width: 80rpx;
						min-width: 80rpx;
						margin: 0 30rpx;
					}

					&-text {
						padding: 20rpx 30rpx;
						background-color: #fff;
						border-radius: 20rpx;
					}

					&-img-box {
						height: 200rpx;
						width: 200rpx;
					}

					&-voice-box-right {
						width: 100%;
						height: 60rpx;
						padding-left: 20%;
						line-height: 60rpx;

						&-item {
							height: 100%;
							background-color: #fff;
							border-radius: 10rpx;
							float: right;
							text-align: right;
							text-indent: 1rem;

							&-text {
								margin-right: 20rpx;
							}
						}
					}

					&-voice-box-left {
						width: 100%;
						height: 60rpx;
						line-height: 60rpx;

						&-item {
							height: 100%;
							background-color: #fff;
							border-radius: 10rpx;
							float: left;
							text-align: left;
							text-indent: 1rem;

							&-text {
								margin-right: 20rpx;
							}
						}
					}
				}
			}
		}

		&-footer {
			@include absolute(null, null, 0, 0);
			width: 100%;
		}

		&-action {
			/deep/ {
				.u-actionsheet-cancel {
					color: #666;
				}
			}
		}
	}
</style>
