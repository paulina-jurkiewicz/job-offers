import { Plugin }                 from '@nuxt/types';

declare module 'vue/types/vue' {

    interface Vue {
        $api: {
        };
    }
}

const apiPlugin: Plugin = ( { $axios }, inject ) => {
    if ( process.client ) {
        const token = localStorage.getItem( 'token' );
        // Set token when defined
        if ( token ) {
            $axios.setToken( token, 'Bearer' );
        }
    }

    // Initialize API repositories
    const repositories = {
    };

    inject( 'api', repositories );
};

export default apiPlugin;
