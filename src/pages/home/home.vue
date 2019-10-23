<template>
  <view>
    <scroll-view
      scroll-y
      class="page"
    >
      <swiper
        class="swiper"
        :indicator-dots="true"
        :autoplay="true"
      >
        <swiper-item>
          <image :src="require('../../assets/images/banner.jpg')"></image>
        </swiper-item>
        <swiper-item>
          <image :src="require('../../assets/images/banner.jpg')"></image>
        </swiper-item>
        <swiper-item>
          <image :src="require('../../assets/images/banner.jpg')"></image>
        </swiper-item>
      </swiper>
      <view class="menu-list">
        <view>
          <icon
            class="cuIcon-edit"
            size="40"
          />
          <text>画规</text>
        </view>
        <view>
          <icon
            class="cuIcon-like"
            size="40"
          />
          <text>筛选王</text>
        </view>
      </view>
      <view class="notice">
        <icon class="cuIcon-notification">

        </icon>
        <text class="label"> 公告：</text>
        <swiper
          class="swiper"
          :autoplay="true"
          :vertical="true"
        >
          <swiper-item>
            <text>开奖啦！开奖啦！开奖啦！开奖啦！</text>
          </swiper-item>
          <swiper-item>
            <text>开奖啦！开奖啦！开奖啦！开奖啦！</text>
          </swiper-item>
          <swiper-item>
            <text>开奖啦！开奖啦！开奖啦！开奖啦！</text>
          </swiper-item>
        </swiper>
      </view>
      <view class="content">
        <view class="title">
          开奖&往期
        </view>
        <view class="box">
          <view>
            <text class="name">七星彩</text>
            <text class="flex_1">第
              <text> 10000</text>
              期开奖
            </text>
            <text class="time">2019-05-11 星期天</text>
          </view>
          <view class="number">
            <text>01</text>
            <text>02</text>
            <text>03</text>
            <text>14</text>
            <text>5</text>
            <text>6</text>
            <text>11</text>
          </view>
          <view class="btn"><text> 往期奖表&raquo;</text></view>
        </view>
        <view class="box">
          <view>
            <text class="name">排列五</text>
            <text class="flex_1">第
              <text> 19200</text>
              期开奖
            </text>
            <text class="time">2019-05-11 星期天</text>
          </view>
          <view class="number">
            <text>1</text>
            <text>2</text>
            <text>3</text>
            <text>4</text>
            <text>5</text>
            <text>6</text>
            <text>7</text>
          </view>
          <view class="btn"><text> 往期奖表&raquo;</text></view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script lang="ts">
import Vue from "@/lib/mixin";
import { Component } from "vue-property-decorator";
import { State, Action } from "vuex-class";
import { HomeStore } from "./store";

@Component({
  components: {}
})
export default class extends Vue {
  @State(state => state[HomeStore.id].count)
  public count!: number;

  @State(state => state[HomeStore.id].data)
  public data!: any;

  @Action(`${HomeStore.id}/incr`)
  public incr!: (props: number) => Promise<number>;

  @Action(`${HomeStore.id}/test`)
  public test!: () => Promise<any>;

  public async onLoad() {
    // wx.showLoading();
  }

  public async add() {
    console.log(3333, await this.incr(10));
  }

  public async created() {
    this.setTitle("主页");
    console.log(2222, await this.test());
  }
}
</script>

<style lang="less" scoped>
.page {
  height: 100vh;

  .swiper {
    image {
      width: 100%;
      height: 100%;
    }
    margin-bottom: 1rem;
  }
  .menu-list {
    height: 4.6rem;
    text-align: center;
    margin: 0 0.6rem;
    display: flex;
    margin-bottom: 0.6rem;
    view {
      margin-right: 1rem;
      flex: 1;
      icon {
        display: inline-block;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        background-color: #e66465;
        border-radius: 1.5rem;
        color: #ffffff;
        font-size: 1.8rem;
      }
      text {
        display: block;
        line-height: 2rem;
        font-size: 0.8rem;
      }
    }
  }
  .notice {
    height: 1.6rem;
    line-height: 1.6rem;
    border-radius: 0.8rem;
    margin: 0 0.6rem 1rem;
    padding: 0 0.6rem;
    background-color: #7c7c8e;
    color: #ffffff;
    display: flex;
    overflow: hidden;
    .label,
    icon {
      color: #fefb01;
    }
    icon {
      margin-right: 0.2rem;
    }
    swiper {
      flex: 1;
	  height: 100%;
	  font-weight: lighter;
	  font-size: 0.6rem;
    }
  }
  .content {
    .title {
      font-size: 0.8rem;
      line-height: 2rem;
      border-bottom: 1px dashed #e1e1e1;
      padding: 0 0.6rem;
    }
    .box {
      border-bottom: 1px dashed #e1e1e1;
      padding: 0 0.6rem;
      text-align: center;
      padding-bottom: 1rem;
      height: 7.6rem;
      view {
        display: flex;
        line-height: 2.7rem;
        .name {
          font-size: 1rem;
          font-weight: bold;
          color: #dd5353;
          text-align: left;
          -webkit-text-shadow: 5px 5px 5px #ff0000;
          text-shadow: 0 0 2px 2px #ff6600;
          margin-right: 0.6rem;
          line-height: 2.4rem;
        }
        .flex_1 {
          flex: 1;
          text-align: left;
          text {
            color: #e66465;
          }
		}
		.time{
			font-size: 0.7rem;
		}
        &.number {
          display: inline-block;
          text-align: center;
          height: 2rem;
          line-height: 2rem;
          width: 80%;
          font-weight: bolder;
          font-size: 1rem;
          margin-bottom: 0.6rem;
          color: #ffffff;
          text {
            display: inline-block;
            width: 1.6rem;
            height: 1.6rem;
            text-align: center;
            line-height: 1.7rem;
            border-radius: 0.9rem;
            margin-right: 0.4rem;
            background: linear-gradient(#ffa263, #ff6600);
          }
          text:last-child {
            background: linear-gradient(#7abcff, #0073e6);
          }
        }
      }
      .btn {
        text-align: right;
        display: inherit;
        height: 1.6rem;
        line-height: 1.6rem;
        text {
          background-color: #e66465;
          display: inline-block;
          padding: 0 1rem;
          color: #ffffff;
          border-radius: 0.8rem;
        }
      }
    }
  }
}
</style>
