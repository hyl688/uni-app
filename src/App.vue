<script lang="ts">
///<reference path="./main.d.ts" />

import Vue from 'vue';

export default Vue.extend({
    mpType: 'app',
    onLaunch() {
        console.log('App Launch');
    },
    onShow() {
        console.log('App Show')
    },
    onHide() {
        console.log('App Hide')
    }
});
</script>
<style>
@import "./lib/colorui/main.css";
@import "./lib/colorui/icon.css";
@import "./assets/global.css";
.status_bar {
    height: var(--status-bar-height);
    width: 100%;
}
</style>
