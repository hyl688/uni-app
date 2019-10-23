<template>
  <view>
    <view class="h4" @tap="openBroadcastList">
      <icon
        size="23"
        class="cuIcon-camera"
      ></icon><text>直接播放</text><text class="cuIcon-right"></text>
    </view>
    <view class="h4">
      <icon class="cuIcon-shop"></icon><text>中国体彩网</text><text class="cuIcon-right"></text>
    </view>
    <view class="h4">
      <icon class="cuIcon-full"></icon><text>竞彩网</text><text class="cuIcon-right"></text>
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
    this.setTitle("开奖直播");
  }
  
  public openBroadcastList() {
    uni.navigateTo({
      url: "/pages/moment/zhiboList/zhiboList"
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
  text{
	  vertical-align: super;
  }
  .cuIcon-right {
	float: right;
  }
}
</style>
