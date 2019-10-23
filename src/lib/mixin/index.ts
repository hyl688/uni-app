import { Vue, Component } from 'vue-property-decorator';
import { ContainerStore } from '@/layout/store';
import { Action } from 'vuex-class';
import { UniHttp } from '../http';

declare module ext {
    interface Vue {
        handleReset(name: string): void;
        setTitle: (title: string) => Promise<string>;
        StatusBar: number;
        CustomBar: number;
    }
}

/**
* mixins
*/
@Component
export default class extends Vue {

    @Action(`${ContainerStore.id}/setTitle`)
    public setTitle!: (title: string) => Promise<string>;

    public StatusBar!: number;
    public CustomBar!: number;

    public $http!: UniHttp;

    handleReset(name: string): void {
        // window.alert(`${name}`)
    }
}
