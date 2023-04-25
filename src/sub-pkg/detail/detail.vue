<template>
  <view>
    详情页分享
  </view>
</template>

<script>
export default {
  // 点击分享后触发的回调
  onShareAppMessage () {
    return {
      title: '详情页的标题',
      path: '/sub-pkg/detail/detail'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
