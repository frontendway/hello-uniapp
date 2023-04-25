<template>
  <view class="home-outer">
    <view class="fixed-top">
      <view
        class="search-outer"
        :style="{'paddingTop': `${statusBarHeight}px`}"
        @click="onToSearch"
      >
        <view class="search">
          动态计算顶部状态栏高度
        </view>
      </view>
      <view class="u-tabs-outer">
        <u-tabs :list="list" />
      </view>
    </view>
    <view class="box">
      <view
        class="btns-outer"
        :style="{'marginTop': disTop + 'px'}"
      >
        <u-button
          type="default"
          @click="onGoLoginPage"
        >
          点击登录
        </u-button>
        <u-button
          type="default"
          @click="onGoDetailPage"
        >
          去详情页，并分享详情页
        </u-button>
        <u-button
          type="default"
          @click="onSubscribeMessagePage"
        >
          订阅消息
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
import uTabs from 'uview-ui/components/u-tabs/u-tabs.vue'
import uButton from 'uview-ui/components/u-button/u-button.vue'

export default {
  components: {
    uTabs,
    uButton
  },
  data () {
    return {
      statusBarHeight: 0,
      disTop: 0,
      list: [
        {
          name: '待收货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价',
          count: 5
        },
        {
          name: '待收货'
        },
        {
          name: '待付款'
        },
        {
          name: '待评价',
          count: 5
        }
      ]
    }
  },
  beforeMount () {
    this.getStatusBarHeight()
  },
  methods: {
    async getStatusBarHeight () {
      const res = await uni.getSystemInfoAsync()
      const isIOS = res.system.indexOf('iOS') !== -1
      this.statusBarHeight = res.statusBarHeight + (isIOS ? 4 : 8)
    },
    onToSearch () {
      uni.navigateTo({
        url: '/sub-pkg/search/search'
      })
    },
    onGoLoginPage () {
      uni.navigateTo({
        url: '/sub-pkg/login/login'
      })
    },
    onGoDetailPage () {
      uni.navigateTo({
        url: '/sub-pkg/detail/detail'
      })
    },
    onSubscribeMessagePage () {
      uni.navigateTo({
        url: '/sub-pkg/subscribe-message/subscribe-message'
      })
    },
    getFixedTopHeight () {
      const query = uni.createSelectorQuery().in(this)
      query.select('.fixed-top')
        .boundingClientRect((data) => {
          this.disTop = data.height
        }).exec()
    }
  },
  onReachBottom () {
    console.log('触底了')
  },
  onReady () {
    this.getFixedTopHeight()
  }
}
</script>

<style lang="scss" scoped>
.fixed-top{
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  background: #fff;
}
.search-outer{
  height: 32px;
  box-sizing: content-box;
  padding: 0px 20rpx;
  .search{
    width: 60%;
    border-radius: 20px;
    background: rgb(233, 230, 230);
    line-height: 32px;
    text-indent: 20rpx;
  }
}
.u-tabs-outer{
  overflow: hidden;
}
.box{
  overflow: hidden;
  background: rgb(231, 229, 229);
}
</style>
