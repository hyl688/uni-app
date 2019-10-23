<template>
    <view class="root">
        <view class="status_header">
            <view class="status_bar" />
            <view class="header">
                <view class="hitem back">{{ current === 'home'?'':'返回' }}</view>
                <view class="hitem title">{{title}}</view>
                <view class="hitem right"></view>
            </view>
        </view>
        <home v-if="current === 'home'" />
        <moment v-if="current === 'moment'" />
        <my v-if="current === 'my'" />
        <view class="cu-bar tabbar bg-white shadow foot">
            <view class="action" @click="navChangeTo" data-cur="home">
                <view class="cu-item">
                    <text class="lg text-gray" :class="current === 'home'?'cuIcon-homefill':'cuIcon-home'"></text>
                    <text>主页</text>
                </view>
            </view>
            <view class="action" @click="navChangeTo" data-cur="moment">
                <view class="cu-item">
                    <text class="lg text-gray" :class="current === 'moment'?'cuIcon-newfill':'cuIcon-new'"></text>
                    <text>发现</text>
                </view>
            </view>
            <view class="action" @click="navChangeTo" data-cur="my">
                <view class="cu-item">
                    <text class="lg text-gray" :class="current === 'my'?'cuIcon-myfill':'cuIcon-my'"></text>
                    <text>我的</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts">
import Vue from '@/lib/mixin';
import { State, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';
import { ContainerStore } from './store';
import home from '../pages/home/home.vue';
import moment from '../pages/moment/moment.vue';
import my from '../pages/my/my.vue';

@Component({
    components: { home, moment, my }
})
export default class extends Vue {

    @State(state => state[ContainerStore.id].current)
    public current!: string;

    @State(state => state[ContainerStore.id].title)
    public title!: string;

    @Action(`${ContainerStore.id}/navChange`)
    public navChange!: (current: string) => Promise < any > ;

    public async navChangeTo(e: any) {
        await this.navChange(e.currentTarget.dataset.cur);
    }

    public onLoad() {}

    public async created() {
        console.log(this.StatusBar, this.CustomBar);
    }
}
</script>

<style scoped>
.status_header {
    background-color: rgba(64, 169, 255, .8);
}

.size {
    font-size: 50upx;
}

.header {
    display: flex;
    padding: 10upx 45upx;
}

.hitem {
    flex: 1;
}

.back {
    text-align: left;
}

.title {
    text-align: center;
}

.right {
    text-align: right;
}
</style>
