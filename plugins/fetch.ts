import https                  from 'https';
import { AxiosRequestConfig } from '~/node_modules/axios';

const agent = new https.Agent( {
    rejectUnauthorized: false
} );

function errorHandler( error ) {
    // check for errorHandle config
    if ( error.config.hasOwnProperty( 'errorHandle' ) && error.config.errorHandle === false ) {
        return Promise.reject( error );
    }

    if ( error.response ) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log('response', error.response.data);
        // console.log('response', error.response.status);
        // console.log('response', error.response.headers);
        return Promise.reject( error.response );
    } else if ( error.request ) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log('request', error.request);
        return Promise.reject( error.request );
    } else if ( error.message ) {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
        return Promise.reject( error.message );
    } else if ( error.config ) {
        // console.log('config', error.config);
        return Promise.reject( error.config );
    }

    return Promise.reject( error );
}

export default ( ctx, inject ) => {
    const $axios = ctx.app.$axios;

    $axios.interceptors.response.use( undefined, function axiosRetryInterceptor( err ) {
        const config = err.config;
        // If config does not exist or the retry option is not set, reject
        if ( !config || !config.retry ) {
            return Promise.reject( err );
        }

        // Set the variable for keeping track of the retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we've maxed out the total number of retries
        if ( config.__retryCount >= config.retry ) {
            // Reject with the error
            return Promise.reject( err );
        }

        // Increase the retry count
        config.__retryCount += 1;

        // Create new promise to handle exponential backoff
        const backoff = new Promise( ( resolve ) => {
            setTimeout( () => {
                resolve();
            }, config.retryDelay || 1 );
        } );

        // Return the promise in which recalls axios to retry the request
        return backoff.then( () => $axios( config ) );
    } );

    if ( ctx.req && !ctx.res.getHeader( 'Cache-Control' ) ) {
        ctx.res.setHeader( 'Cache-Control', 'no-cache, no-store, must-revalidate' );
    }

    async function fetchJson( url: string, config?: AxiosRequestConfig ) {
        if ( ctx.req ) {
            return ( await $axios.$get( url, {
                httpsAgent: agent,
                headers: { 'X-COUNTRY': ctx.req.headers[ 'app-country' ] }
            } ).catch( errorHandler ) );
        } else {
            return ( await $axios.$get( url, { retry: 3, retryDelay: 1000, ...config } ).catch( errorHandler ) );
        }
    }

    ctx.$fetchJson = fetchJson;
    inject( 'fetchJson', fetchJson );

    async function postJson( url: string, data?: any, config?: AxiosRequestConfig ) {
        if ( ctx.req ) {
            return ( await $axios.$post( url, data, {
                httpsAgent: agent,
                headers: { 'X-COUNTRY': ctx.req.headers[ 'app-country' ] }
            } ).catch( errorHandler ) );
        } else {
            return ( await $axios.$post( url, data, { ...config } ).catch( errorHandler ) );
        }
    }

    ctx.$postJson = postJson;
    inject( 'postJson', postJson );
};
