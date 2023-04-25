<template>
  <view class="login-outer">
    <view class="button-outer">
      <u-button
        type="primary"
        @click="onWxLogin"
      >
        微信登录
      </u-button>
      <u-button
        type="default"
      >
        手机号登录
      </u-button>
    </view>
  </view>
</template>

<script>
import uButton from 'uview-ui/components/u-button/u-button.vue'
// import { AppID, AppSecret } from '../../config/index.js'

export default {
  components: {
    uButton
  },
  methods: {
    onWxLogin () {
      uni.getUserProfile({
        desc: '丰富用户信息',
        success: async (userInfo) => {
          // 1.先获取临时登录凭证 code
          const { code } = await uni.login()
          // 2.用 code 获取 session_key 和 openid 这个动作在开发者服务器完成，这里仅做测试
          /*
            const { openid, session_key: sessionKey } = await this.$u.get('https://api.weixin.qq.com/sns/jscode2session', {
              appid: AppID,
              secret: AppSecret,
              js_code: code,
              grant_type: 'authorization_code'
            })
          */
          // 3.将加密数据传递给开发者服务器，后端解密后确认是哪个用户并进行登录操作
          this.$u.post('/wxLogin', {
            code,
            rawData: userInfo.rawData,
            signature: userInfo.signature,
            encryptedData: userInfo.encryptedData, // 用户信息加密后的数据
            iv: userInfo.iv
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.button-outer{
  margin: 0px 60rpx;
}
</style>
