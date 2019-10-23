import { Mutation, Action, MutationAction } from 'vuex-module-decorators';
import { Module, VuexModule } from '@/lib/vuex';
import { HomeService } from './service';

@Module
export class HomeStore extends VuexModule {

    public count: number;
    public data: any;

    public service: HomeService;
    constructor(state: HomeStore) {
        super(state);
        this.count = 0;
        this.data = '';
        this.service = new HomeService;
    }

    @Mutation
    public async increment(delta: number) {
        this.count += delta;
    }

    @Mutation
    public async decrement(delta: number) {
        this.count -= delta;
    }

    // action 'incr' commits mutation 'increment' when done with return value as payload
    @Action({ commit: 'increment' })
    public async incr() {
        return 5;
    }
    // action 'decr' commits mutation 'decrement' when done with return value as payload
    @Action({ commit: 'decrement' })
    public async decr() {
        return 5;
    }

    @Action({ commit: 'testapi' })
    public async test() {
        return await this.service.test();
    }

    @Mutation
    public async testapi(data: any) {
        console.log(data);
        this.data = data;
    }

}