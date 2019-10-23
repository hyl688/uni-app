<template>
  <view>
    <view class="box">
      <view class="title"><text>开奖直播</text><text class="time">10小时21分10秒</text></view>
      <view class="content">
        <view>
          <image :src="require('../../../assets/images/img.jpg')">
          </image>
        </view>
        <view class="btn">
          点击进入
        </view>
      </view>
    </view>
    <view class="box">
      <view class="title"><text>开奖直播</text><text class="time">10小时21分10秒</text></view>
      <view class="content">
        <view>
          <image :src="require('../../../assets/images/img.jpg')">
          </image>
        </view>
        <view class="btn">
          点击进入
        </view>
      </view>
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
}
</script>

<style lang="less" scoped>
.box {
  height: 9.2rem;
  margin: 1rem 0.6rem 0;
  border-radius: 0.6rem;
  background: linear-gradient(170deg, #fad4ab, #ff7a7a);
  padding: 0 0.4rem;
  .title {
    font-size: 1rem;
    height: 2.4rem;
    line-height: 2.4rem;
    padding: 0 0.6rem;
    border-bottom: 1px solid #ffffff6e;
    color: #e66465;
    font-weight: bolder;
    .time {
      float: right;
      font-size: 0.6rem;
      font-weight: normal;
    }
  }
  .content {
    padding: 0.8rem 0.6rem;
  }
  image {
    width: 5rem;
    height: 5rem;
    float: left;
    font-family: "cuIcon";
    position: relative;
    ::after {
      position: absolute;
      content: "\e74f";
      font-size: 2rem;
      color: #ffffff;
      border: 0.1rem solid #ffffff;
      padding: 0.2rem;
      border-radius: 1.8rem;
      width: 3rem;
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      margin: 0.7rem;
    }
  }
  .btn {
    width: 8rem;
    height: 2.2rem;
    line-height: 2.2rem;
    text-align: center;
    border-radius: 1.1rem;
    float: right;
    font-size: 0.9rem;
    border: 1px solid #ffffff73;
    background: linear-gradient(#ffd09d, #ff7a7a);
    // box-shadow: 0.1rem 0.1rem 0.4rem 0.2rem #d1464648;
    color: #ffffff;
    margin-top: 1.1rem;
  }
}
</style>
