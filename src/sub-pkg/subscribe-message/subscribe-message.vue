<template>
  <view>
    <u-button @click="onSubscribeMessagePage">
      点击订阅模板消息
    </u-button>
  </view>
</template>

<script>
import uButton from 'uview-ui/components/u-button/u-button.vue'

// 获取小程序整个应用的实例
// const app = getApp()

export default {
  components: {
    uButton
  },
  data () {
    return {
      // 小程序后台中所有订阅消息的模板 id 列表
      templIds: [
        'F3lNkVjdNYvxqWsFsqnmKqxgJ3qiXUPnW89B8WUukZ0', // 下单成功通知
        'cPxqiyBJYZMV1nhoG8lwr05-uKT4PLlPUH42DF_Lp-I', // 收到师傅接单通知
        'Fd4_eFBSCvlk7Ad48HBMgC3qxes6A3t0r1wfEfsQCXU', // 上门时间变更通知
        'zvbbRnWBUk_M6E05v-iI-4PlHp8n6cyxMHB-MZhQhLQ' // 订单衣物异常通知
      ],
      subscriptionsSetting: {
        itemSettings: []
      }
    }
  },
  methods: {
    // 订阅用户没有订阅的模板消息，onload 时已经过滤出没有订阅的模板消息列表，保存在 itemSettings 中
    onSubscribeMessagePage () {
      const { itemSettings } = this.subscriptionsSetting
      uni.requestSubscribeMessage({
        tmplIds: itemSettings,
        complete: (resp) => {
          if (resp.errCode === 20004) {
            uni.showModal({
              title: '您关闭了订阅通知',
              content: '需要打开进行手动设置吗？',
              success (resp) {
                if (resp.confirm) {
                  uni.openSetting()
                } else if (resp.cancel) {
                  uni.showToast({
                    icon: 'error',
                    title: '您取消了订阅'
                  })
                }
              }
            })

            return
          }
          itemSettings.forEach((key) => {
            const settingRes = resp[key]
            if (settingRes === 'accept') {
              uni.showToast({
                icon: 'none',
                title: '您订阅了该消息'
              })
            } else if (settingRes === 'reject') {
              uni.showToast({
                icon: 'none',
                title: '您拒绝订阅了该消息'
              })
            }
          })
        }
      })
    }
  },
  onLoad () {
    // 1.首先获取用户已经同意订阅的消息列表模板 id
    uni.getSetting({
      withSubscriptions: true,
      complete: (data) => {
        const { subscriptionsSetting } = data
        if (!subscriptionsSetting.itemSettings) {
          this.subscriptionsSetting.itemSettings = this.templIds
        } else {
          const { itemSettings } = subscriptionsSetting
          // 拿到用户已经订阅的所有消息模板 id
          const templIds = Object.keys(itemSettings)
          this.subscriptionsSetting.itemSettings = this.templIds.filter(id => !templIds.includes(id))
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
