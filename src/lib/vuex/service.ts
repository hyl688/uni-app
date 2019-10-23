import Vue from 'vue';
import { UniHttp, BeforeInterceptor, UniHttpConfig, UniHttpResponseError, AfterInterceptor, UniHttpResponse } from '../http';
import hconfig from '@/config/http';

export interface VuexService { }

export class Service implements VuexService {

    protected http: UniHttp;

    constructor() {
        this.http = UniHttp.use(class implements BeforeInterceptor {
            public success(config: UniHttpConfig) {
                console.log('is global request interceptor 1', config);
                // getToken() && (config.header.token = getToken());
                return config;
            }
            public fail(err: UniHttpResponseError) {
                console.error('is global fail request interceptor: ', err);
                return false;
            }
        }).after(class implements AfterInterceptor {
            public success(response: UniHttpResponse, config: UniHttpConfig) {
                console.log('is global response interceptor');

                // 回传数据中没有携带 code
                if (!(response.data && response.data.code)) {
                    return response;
                }

                // 用code模拟http状态码
                const code = parseInt(response.data.code);

                // 20x ~ 30x
                if (200 <= code && code < 400) {
                    return response;
                } else {
                    return Promise.reject(response);
                }
            }
            public fail(err: UniHttpResponseError, config: UniHttpConfig) {
                console.error('is global response fail interceptor');
                console.error('err: ', err)
                console.error('config: ', config)
                const { errMsg, data } = err;

                return Promise.reject({ errMsg, data, config });
            }
        }).create(hconfig);
    }
}