import Vue                                                            from 'vue';
import Vuex                                                           from 'vuex';

Vue.use( Vuex );

/**
 * Check registred module
 * @param {Array} aPath - path to module - ex: ['my', 'nested', 'module']
 * @return {Boolean}
 */
// @ts-ignore
// tslint:disable-next-line:only-arrow-functions
Vuex.Store.prototype.hasModule = function ( aPath ) {
    // @ts-ignore
    let m = this._modules.root;
    return [].concat( ...[ aPath ] ).every( ( p ) => {
        m = m._children[ p ];
        return m;
    } );
};

const types = {
};

interface State {}

export type RootState = State;

const state = (): State => ( {} );

const isDev = process.env.NODE_ENV !== 'production';

const store = () => new Vuex.Store( {
    state: () => {
        return {
            country: 'pl',
            locale: 'pl',
            ga: '',
            optimizeId: '',
            messages: {}
        };
    },
    actions: {
        async nuxtServerInit( { commit }, { req } ) {
            // console.log( 'nuxtServerInit' );
        },

        async nuxtClientInit() {
            // console.log( 'nuxtClientInit' );
        }
    },
    mutations: {},
    getters: {},
    modules: {},
    strict: isDev,
    devtools: true
} );

export default store;
