import { VuexModule as VxModule, Module as VModule } from 'vuex-module-decorators';
import { Module as Mod } from 'vuex';

export function Module<S>(module: Function & Mod<S, any>): any {
    if (!(module as any).id) {
        (module as any).id = Number(
            Math.random().toString().substring(3, 10) +
            Date.now()
        ).toString(36);
    }
    VModule({ namespaced: true })(module);
}

export class VuexModule<S = ThisType<any>, R = any> extends VxModule {
    public static id: string;
}
