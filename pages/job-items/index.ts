import { Component, Vue }               from 'nuxt-property-decorator';
import { Jsonld }                       from 'nuxt-jsonld';
import { JobService }                   from '~/store/Job';
import GHeadline                        from '~/components/Atoms/Headline/Headline';
import GJobItem                         from '~/components/Organisms/JobItem/JobItem';

@Jsonld
@Component( {
    layout: 'desktop',
    scrollToTop: true,
    components: {
        GHeadline,
        GJobItem
    }
} )
export default class JobItems extends Vue {
    get title() {
        const city = this.$route.params.region? this.$route.params.region: '';

        return this.$t( 'job_listing.title', { city } );
    }

    head() {
        const total = this.totalJobs;
        const placeholder = this.$route.params.region? this.$route.params.region: '';
        const title = this.$t( 'meta.title.job_listing', { placeholder } );
        const description = this.$t( 'meta.description.job_listing', { placeholder, total } );

        return {
            title,
            meta: [
                { hid: 'robots', name: 'robots' },
                {
                    hid: 'description',
                    name: 'description',
                    // @ts-ignore
                    content: description
                }
            ],
            bodyAttrs: {
                class: 'job-items'
            }
        };
    }

    get totalJobs() {
        return JobService.total;
    }

    get jobs() {
        return JobService.jobs;
    }

    async onClickJobOffer( id: string ) {
        const route = this.$router.resolve( {
            name: 'job_offer',
            params: { id }
        } );

        try {
            await this.$router.replace( route.href );
        } catch ( reason ) {
            throw reason;
        }
    }

    async mounted() {
        window.history.pushState( null,'', this.$route.path );
    }
}
