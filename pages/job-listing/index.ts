import { Component, Vue, Watch }        from 'nuxt-property-decorator';
import { Jsonld }                       from 'nuxt-jsonld';
import { JobService }                   from '~/store/Job';
import GHeadline                        from '~/components/Atoms/Headline/Headline';
import GFilters                         from "~/components/Organisms/Filters/Filters";

@Jsonld
@Component( {
    layout: 'desktop',
    scrollToTop: true,
    components: {
        GHeadline,
        GFilters
    }
} )
export default class JobListing extends Vue {
    get jobOffersLength() {
        return JobService.jobs.length;
    }

    get isLoading() {
        return JobService.loading;
    }

    async fetch() {
        const { params, query } = this.$nuxt.context;

        try {
            await JobService.fetch( {
                category: params.category,
                region: params.region,
                query
            } );

        } catch ( reason ) {
            throw reason;
        }
    }

    async mounted() {
        const { params, query } = this.$nuxt.context;

        try {
            await JobService.fetch( {
                category: params.category,
                region: params.region,
                query
            } );
        } catch ( reason ) {
            throw reason;
        }
    }

    async onClickJobOffer( id: string ) {
        const route = this.$router.resolve( {
            name: 'job_item',
            params: { id }
        } );

        try {
            await this.$router.replace( route.href );
        } catch ( reason ) {
            throw reason;
        }
    }

    @Watch( '$route', { immediate: false, deep: false } )
    private async urlChanged() {
        const query = this.$route.query;
        const path = this.$route.path;

        try {

            await JobService.fetch( {
                category: this.$route.params.category,
                region: this.$route.params.region,
                query
            } );
        } catch ( reason ) {
            throw reason;
        }
    }
}
