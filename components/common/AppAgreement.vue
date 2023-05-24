<template>
  <view class="app-agreement">
    <AtDrawer
      :show="isShow"
      :width="drawerWidth"
      :on-close="closePage"
      right
    >
      <AppHeader
        class="header-theme-bg"
        :title="title"
        :is-close="true"
        :has-height="true"
        @closePage="closePage"
      />
      <view class="agreement-content">
        <AppHtml :rich-text="agreement" />
      </view>
    </AtDrawer>
  </view>
</template>
<script>
import AppHeader from "@/components/AppHeader"
import AppHtml from "@/components/AppHtml"
import { AtDrawer } from 'taro-ui-vue'
export default {
  components: {
    AppHeader,
    AppHtml,
    AtDrawer
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    agreement: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      drawerWidth: '0'
    }
  },
  beforeMount () {
    let obj = this.$getSysInfo()
    this.drawerWidth = obj.widWidth
  },
  methods: {
    closePage () {
      this.$emit('update:isShow', false)
    }
  }
}
</script>
<style lang="scss">
.app-agreement {
  .agreement-content {
    padding: 24px;
  }
}
</style>