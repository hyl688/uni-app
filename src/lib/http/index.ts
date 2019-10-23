export interface UniHttpConfig extends RequestOptions {
    baseURL?: string;
}

export interface UniHttpResponse extends RequestSuccessCallbackResult {
    [x: string]: any;
    data?: any;
}

export interface UniHttpResponseError extends GeneralCallbackResult {
    [x: string]: any;
    data?: any;
}

export interface BeforeInterceptor {
    success: ((config: UniHttpConfig) => UniHttpConfig),
    fail: ((err: UniHttpResponseError) => any);
}

export interface AfterInterceptor {
    success: ((response: UniHttpResponse, config: UniHttpConfig) => UniHttpResponse),
    fail: ((err: UniHttpResponseError, config: UniHttpConfig) => any);
}

export interface UseInterceptor {
    request: Function[];
    response: Function[];
}

export class UniHttp {

    private static _this: UniHttp;

    public static create(config?: UniHttpConfig) {
        if (!UniHttp._this) UniHttp._this = new UniHttp(config || {});
        else { if (config) UniHttp._this.config = config; };
        return UniHttp._this;
    }

    public static use(props: Function | Function[]) {
        if (props.constructor === Array && props instanceof Array) {
            UniHttp.create().global.request = UniHttp.create().global.request.concat(props);
        } else {
            UniHttp.create().global.request.push(props as Function);
        }
        return UniHttp;
    }

    public static after(props: Function | Function[]) {
        if (props.constructor === Array && props instanceof Array) {
            UniHttp.create().global.response = UniHttp.create().global.response.concat(props);
        } else {
            UniHttp.create().global.response.push(props as Function);
        }
        return UniHttp;
    }

    public config: UniHttpConfig;
    private global: UseInterceptor;
    private scoped: UseInterceptor;
    private network?: RequestTask;
    private upOnProgressUpdate?: (result: OnProgressUpdateResult) => void;

    constructor(config?: UniHttpConfig) {
        this.config = config || {};
        this.global = { request: [], response: [] };
        this.scoped = { request: [], response: [] };
    }

    public use(props: Function | Function[]) {
        if (props.constructor === Array && props instanceof Array) {
            this.scoped.request = this.scoped.request.concat(props);
        } else {
            this.scoped.request.push(props as Function);
        }
        return this;
    }

    public after(props: Function | Function[]) {
        if (props.constructor === Array && props instanceof Array) {
            this.scoped.response = this.scoped.response.concat(props);
        } else {
            this.scoped.response.push(props as Function);
        }
        return this;
    }

    public request(mconfig: UniHttpConfig) {
        let p: Promise<any> = Promise.resolve({
            ...this.config,
            ...mconfig
        });
        const reqs = this.global.request.concat(this.scoped.request);
        const ress = this.global.response.concat(this.scoped.response);

        this.scoped.request = [];
        this.scoped.response = [];

        reqs.forEach((Interceptor: any) => {
            const inter = new Interceptor();
            p = p.then(inter.success).catch(inter.fail);
        });
        p = p.then(config => {
            return this.unirequest(config);
        }).then((resp) => {
            this.network = undefined;
            return { resp, config: mconfig };
        }).catch((err) => {
            this.network = undefined;
            return { err, config: mconfig };
        });

        ress.forEach((Interceptor: any) => {
            const inter = new Interceptor();
            p = p.then(inter.success).catch(inter.fail);
        });
        return p;
    }

    public unirequest(config: UniHttpConfig) {
        if (config.baseURL) {
            let { baseURL } = config;
            let url: string = config.url || '';
            if (baseURL[baseURL.length - 1] === '/') baseURL = baseURL.substring(0, baseURL.length - 1);
            if (url[0] === '/') url = url.substring(1);
            config.url = `${baseURL}/${url}`;
        };

        return new Promise((success, fail) => {
            this.network = uni.request({ ...config, success, fail });
        });
    }

    public abort() {
        if (this.network) {
            this.network.abort();
            return true;
        }
        return false;
    }

    public async get(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'GET';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'GET' };
        }
        return await this.request(mconfig);
    }

    public async post(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'POST';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'POST' };
        }
        return await this.request(mconfig);
    }

    public async put(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'PUT';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'PUT' };
        }
        return await this.request(mconfig);
    }

    public async delete(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'DELETE';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'DELETE' };
        }
        return await this.request(mconfig);
    }

    public async connect(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'CONNECT';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'CONNECT' };
        }
        return await this.request(mconfig);
    }

    public async head(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'HEAD';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'HEAD' };
        }
        return await this.request(mconfig);
    }

    public async options(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'OPTIONS';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'OPTIONS' };
        }
        return await this.request(mconfig);
    }

    public async trace(url: string | UniHttpConfig, config?: UniHttpConfig) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.method = 'TRACE';
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url, method: 'TRACE' };
        }
        return await this.request(mconfig);
    }

    public toJSON(anyVal: any) {
        try {
            return JSON.parse(anyVal)
        } catch (e) {
            return anyVal;
        }
    }

    public onProgressUpdate(
        callback?: (result: OnProgressUpdateResult) => void
    ) {
        this.upOnProgressUpdate = callback;
    }

    public upload(url: string | UploadFileOption, config: UploadFileOption) {
        let mconfig = config || {};
        if (typeof url === 'string') {
            mconfig.url = url;
        } else if (typeof url === 'object') {
            mconfig = { ...mconfig, ...url };
        }
        let p: Promise<any> = Promise.resolve({
            ...this.config,
            ...mconfig
        });
        const reqs = this.global.request.concat(this.scoped.request);
        const ress = this.global.response.concat(this.scoped.response);

        this.scoped.request = [];
        this.scoped.response = [];

        reqs.forEach((Interceptor: any) => {
            const inter = new Interceptor();
            p = p.then(inter.success).catch(inter.fail);
        });

        p = p.then(config => {
            return new Promise((resolve, reject) => {
                const network = uni.uploadFile({
                    ...config,
                    success: res => {
                        res.data = this.toJSON(res.data);
                        resolve(res);
                    },
                    fail: reject,
                });
                network.onProgressUpdate(this.upOnProgressUpdate);
                this.upOnProgressUpdate = undefined;
                this.network = network;
            });
        }).then((resp) => {
            this.network = undefined;
            return { resp, config: mconfig };
        }).catch((err) => {
            this.network = undefined;
            return { err, config: mconfig };
        });

        ress.forEach((Interceptor: any) => {
            const inter = new Interceptor();
            p = p.then(inter.success).catch(inter.fail);
        });
        return p;
    }
}
