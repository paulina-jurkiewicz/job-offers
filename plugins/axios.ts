import { Vue }                  from 'vue-property-decorator';
import { cacheAdapterEnhancer } from 'axios-extensions';
import LRU                      from 'lru-cache';

const ONE_HOUR = 1000 * 60 * 60;

export default ( { $axios, redirect, app, ssrContext } ) => {
    const defaultCache = process.server
        ? ssrContext.$axCache
        : new LRU( { maxAge: ONE_HOUR } );

    const defaults = $axios.defaults;
    // https://github.com/kuitos/axios-extensions
    defaults.adapter = cacheAdapterEnhancer( defaults.adapter, {
        enabledByDefault: false,
        cacheFlag: 'cache',
        defaultCache
    } );

    $axios.onRequest( ( config ) => {
    } );

    $axios.onError( ( error ) => {
    } );
};
