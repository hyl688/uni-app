<template>
  <view>
    <view class="h4">
      <icon class="cuIcon-share"></icon>
      <text>分享</text><text class="cuIcon-right"></text>
    </view>
    <view class="h4">
      <icon class="cuIcon-emoji"></icon><text>版本</text><text class="cuIcon-right"></text>
    </view>
    <view class="h4">
      <icon class="cuIcon-settings"></icon><text>设置</text><text class="cuIcon-right"></text>
    </view>
  </view>
</template>

<script lang="ts">
import Vue from "@/lib/mixin";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class extends Vue {
  public async onLoad() {
    // wx.showLoading();
  }

  public async created() {
    this.setTitle("我的");
  }

  public openBroadcastList() {
    uni.navigateTo({
      url: "zhiboList/zhiboList"
    });
  }
}
</script>

<style lang="less" scoped>
.h4 {
  height: 4rem;
  line-height: 4rem;
  padding: 0 1rem;
  border-bottom: 1px dashed #e1e1e1;
  color: #333333;
  icon {
    margin-right: 1rem;
    color: #e66465;
    font-size: 2rem;
  }
  text {
    vertical-align: super;
  }
  .cuIcon-right {
    float: right;
  }
}
</style>
