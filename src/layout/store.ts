import { Mutation, Action } from 'vuex-module-decorators';
import { VuexModule, Module } from '@/lib/vuex';

@Module
export class ContainerStore extends VuexModule {

    public current: string = 'home';
    public title: string = '首页';

    @Mutation
    public async navChangeSuccess(page: string) {
        this.current = page;
    }

    @Action({ commit: 'navChangeSuccess' })
    public async navChange(page: string) {
        return page;
    }

    @Mutation
    public async setTitleSuccess(title: string) {
        this.title = title;
    }

    @Action({ commit: 'setTitleSuccess' })
    public async setTitle(title: string) {
        return title;
    }
}