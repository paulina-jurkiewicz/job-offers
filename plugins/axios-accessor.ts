import { Plugin }          from '@nuxt/types';
import { initializeAxios } from '~/api/api';

const accessor: Plugin = ( { $axios } ) => {
    initializeAxios( $axios );
};

export default accessor;
