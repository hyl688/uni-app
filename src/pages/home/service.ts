import { Service } from '@/lib/vuex';

export class HomeService extends Service {
    public async test() {
        return await this.http.get('/test');
    }

    public t() {
        return { name: 'test' };
    }
}