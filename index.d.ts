import { AxiosRequestConfig, AxiosResponse } from '~/node_modules/axios';
import { AsyncComponent, Component }         from 'vue';

declare module '*.vue' {
    import Vue                               from 'vue';
    import { URIF }                          from '~/interfaces/URIF';
    const _default: Vue;
    export default _default;

    interface Vue {
        $urif: URIF;
        date_relative: string;

        $fetchJson<T = any, R = AxiosResponse<T>>( url: string, config?: AxiosRequestConfig ): Promise<R>;

        $postJson<T = any, R = AxiosResponse<T>>( url: string, data?: any, config?: AxiosRequestConfig ): Promise<R>;
    }
}

declare module 'vuex' {
    interface Store<S> {
        hasModule( aPath: string | string[] ): boolean;
    }
}

declare module 'vue/types/vue' {
    import { URIF }                          from '~/interfaces/URIF';

    interface Vue {
        $urif: URIF;
        $dateRelative: ( value: string ) => string;

        $fetchJson<T = any, R = AxiosResponse<T>>( url: string, config?: AxiosRequestConfig ): Promise<R>;

        $postJson<T = any, R = AxiosResponse<T>>( url: string, data?: any, config?: AxiosRequestConfig ): Promise<R>;
    }
}

interface Window {
    __forceSmoothScrollPolyfill__: any;
}

declare module 'vue-truncate-collapsed';

declare const LazyHydrate: Component<{ hydrated: boolean },
    {
        cleanup(): void
        hydrate(): void
    },
    {
        interactionEvents: string[]
    },
    {
        idleTimeout: number
        onInteraction: boolean | string | string[]
        ssrOnly: boolean
        triggerHydration: boolean
        whenIdle: boolean
    }> & { functional: false };

export function hydrateSsrOnly( component: AsyncComponent | Component ): AsyncComponent | Component;

export function hydrateWhenIdle( component: AsyncComponent | Component, options: { ignoredProps?: string[] } ): AsyncComponent | Component;

export function hydrateWhenVisible( component: AsyncComponent | Component, options: { ignoredProps?: string[], observerOptions?: string[] } ): AsyncComponent | Component;

export function hydrateOnInteraction( component: AsyncComponent | Component, options: { event?: string, ignoredProps?: string[] } ): AsyncComponent | Component;

export default LazyHydrate;
