import Vue        from 'vue';
import { Plugin } from '@nuxt/types';

const transPlugin: Plugin = ( { app } ) => {
    const Trans = ( value, ...args ) => {
        // @ts-ignore
        let msg = `${ app.i18n.t( value, ...args ) }`;

        if ( msg.indexOf( '|' ) > -1 ) {
            // @ts-ignore
            msg = `${ app.i18n.tc( value, ...args ) }`;
        }

        return msg;
    };

    Vue.filter( 'trans', Trans );
};

export default transPlugin;
