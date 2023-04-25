<template>
  <view class="search-outer">
    uniapp 中分包：search 页面
    <view>
      token: {{ token }}
    </view>
  </view>
</template>

<script>
export default {
  computed: {
    token () {
      return this.$store.state.token
    }
  }
}
</script>
