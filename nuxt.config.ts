// tslint:disable no-var-requires
import { Configuration }   from '@nuxt/types';
import shrinkRay           from 'shrink-ray-current';
import { getMemwatch }     from 'node-memwatcher';
import MomentLocalesPlugin from 'moment-locales-webpack-plugin';

let memwatch;

const isDev = true;

const pkg = require( './package' );

const configNuxt: Configuration = {
    dev: isDev,
    mode: 'universal',

    head: {
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: pkg.description }
        ]
    },

    plugins: [
        'plugins/i18n',
        'plugins/jsonld',
        'plugins/fetch',
        'plugins/axios',
        'plugins/axios-accessor',
        'plugins/api',
        'plugins/trans',
        'plugins/moment'
    ],

    buildModules: [
        [ '@nuxtjs/dotenv', { systemvars: true} ],
        '@nuxt/typescript-build' ,
        '@nuxtjs/moment'
    ],

    modules: [
        'nuxt-i18n',
        '@nuxtjs/redirect-module',
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        'bootstrap-vue/nuxt',
        '@nuxtjs/device',
        'nuxt-webfontloader',
        'nuxt-polyfill',
        '@aceforth/nuxt-optimized-images',
    ],

    memwatch: {
        graph: true,
        nuxtHook: 'generate:before',
        graphSetup( setup ) {
            setup.metrics.malloc = {
                aggregator: 'avg',
                color: 'cyan'
            };
        },
        graphAddMetric( turtleGraph, stats ) {
            turtleGraph.metric( 'my metrics', 'malloc' ).push( stats.malloced_memory );
        }
    },

    hooks: {
        generate: {
            async before() {
                memwatch = await getMemwatch();
            },
            routeCreated() {
                // this probably wont work as you expect
                // as node/v8 will probably be too busy to run the gc
                // but more importantly there is not really a nuxt hook
                // available to do this in the right place
                // This does work however, but the gc call at route `n`
                // can only clear memory usage by previous routes `< n`
                memwatch.gc();
            }
        }
    },

    i18n: {
        locales: [ {
            code: 'pl',
            file: 'pl-PL.js',
            iso: 'pl-PL'
        } ],
        strategy: 'no_prefix',
        defaultLocale: 'pl',
        lazy: true,
        langDir: './locales/'
    },

    moment: {
        locales: [ 'pl' ],
        defaultLocale: 'pl',
        plugin: false
    },

    axios: {
        baseURL: '',
        browserBaseURL: '/',
        proxy: false,
        proxyHeaders: false
    },

    build: {
        hardSource: false,
        parallel: false,
        cache: !isDev,
        babel: {
            plugins: [ '@babel/plugin-proposal-optional-chaining', 'syntax-optional-chaining' ]
        },
        plugins: [
            new MomentLocalesPlugin( {
                localesToKeep: [ 'pl' ]
            } )
        ],
        /*
        ** You can extend webpack config here
        */
        extend( config, { isDev, isClient } ) {
            // @ts-ignore
            config.module.rules.push( {
                test: /\.ya?ml$/,
                use: 'js-yaml-loader',
                exclude: /node_modules/
            } );

            // @ts-ignore
            config.resolve.alias.translations = '/home/fe/current/frontend/translations/';

            // @ts-ignore
            config.output.filename = 'js/[hash]-[name].js';
            // @ts-ignore
            config.output.chunkFilename = 'js/chunk-[chunkhash:10]-[name].js';

            // lazy-load
            // @ts-ignore
            const vueLoader = config.module.rules.find( ( rule ) => rule.loader === 'vue-loader' );
            // @ts-ignore
            vueLoader.options.transformAssetUrls = {
                'video': [ 'src', 'poster' ],
                'source': 'src',
                'img': [ 'src', 'source', 'data-src' ],
                'image': 'xlink:href',
                'g-lazy-image': [ 'src', 'source', 'data-src', 'data-lazy-load' ],
                'g-lazy-background': [ 'src', 'source', 'data-src', 'data-lazy-load-bg', 'style' ],
                'b-img': 'src',
                'b-img-lazy': [ 'src', 'blank-src' ],
                'b-card': 'img-src',
                'b-card-img': 'img-src',
                'b-card-img-lazy': [ 'src', 'blank-src' ],
                'b-carousel-slide': 'img-src',
                'b-embed': 'src'
            };
        }
    },

    render: {
        http2: {
            push: true
        },
        compressor: shrinkRay(),
        bundleRenderer: {
            directives: {
                // tslint:disable-next-line:object-literal-shorthand only-arrow-functions
                cww: function ( vnode, dir ) {
                    // @ts-ignore
                    const style = vnode.data.style || ( vnode.data.style = {} );
                    // @ts-ignore
                    style.backgroundColor = '#ff0016';
                },
                // tslint:disable-next-line:object-literal-shorthand only-arrow-functions
                ts: function ( vnode, dir ) {
                    const vm = vnode.context;
                    const path = dir.value;
                    // @ts-ignore
                    vnode.children = [ vm._v( vm.$i18n.t( path ) ) ];
                }
            }
        }
    },

    server: {
        host: '0.0.0.0'
    },

    redirect: {
        rules: [
            {
                from: '/\/?$',
                to: '/all/all',
                statusCode: 301
            }
        ],
        onDecode: ( req ) => {
            let url = req.url;
            try {
                url = decodeURI( req.url );
            } catch ( error ) {
                // Rethrow error
                if ( error.message !== 'URI malformed' ) {
                    throw error;
                }
                url = decodeURI( unescape( req.url ) );
                // Fix url also on Nuxt side
                req.url = url;
            }
            return url;
        },
        onDecodeError: ( error, req, res, next ) => next( error )
    },

    router: {
        trailingSlash: undefined,
        mode: 'history',
        extendRoutes( routes, resolve ) {
            routes.push(
                {
                    path: '/',
                    component: 'pages/job-listing/index.vue',
                    children: [
                        {
                            path: '/offer/:id',
                            component: 'pages/job-offer/index.vue',
                            name: 'job_offer'
                        },
                        {
                            path: '/:region/:category',
                            component: 'pages/job-items/index.vue',
                            name: 'job_items'
                        }
                    ]
                }
            );
        }
    },
    polyfill: {
        log: isDev,
        features: [
            {
                require: 'intersection-observer',
                detect: () => 'IntersectionObserver' in window
            },
        ]
    }
};

export default configNuxt;
