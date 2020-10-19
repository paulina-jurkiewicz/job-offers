import { Component, Vue }                                    from 'nuxt-property-decorator';
import { Jsonld }                                            from 'nuxt-jsonld';
import { JobService }                                        from '~/store/Job';
import { IJob }                                              from '~/interfaces/Job/IJob';
import JobOfferHeader                                        from '~/components/Organisms/JobOfferHeader/JobOfferHeader';
import GJobOfferDetails                                      from '~/components/Organisms/JobOfferDetails/JobOfferDetails';
import GJobOfferContent                                      from '~/components/Organisms/JobOfferContent/JobOfferContent';

@Jsonld
@Component( {
    layout: 'desktop',
    scrollToTop: true,
    components: {
        GJobOfferHeader: JobOfferHeader, GJobOfferDetails, GJobOfferContent
    }
} )
export default class JobOffer extends Vue {
    head() {
        const title = this.jobTitle;
        const description =  this.$t('meta.description.job_offer', { title, city: this.jobLocation });

        return {
            title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    // @ts-ignore
                    content: description
                }
            ],
            bodyAttrs: {
                class: 'job-offer'
            }
        };
    }

    get job(): IJob {
        // @ts-ignore
        return JobService.selected;
    }

    get jobVariant() {
        return `variant-${ this.jobCategory }`
    }

    get jobCategory() {
        return this.job.category;
    }

    get jobTitle() {
        return this.job && this.job.title;
    }

    get jobLocation() {
        return this.jobCompany ? this.jobCompany.location.city: '';
    }

    get jobCompany() {
        return this.job && this.job.company;
    }

    get jobInterviewOnline() {
        return this.job.onlineInterview;
    }

    get jobRemote() {
        return this.job.remote;
    }

    get companySize() {
        return String(this.job.company.size);
    }

    get companyName() {
        return this.job.company.name;
    }

    get jobContent() {
        return this.job.content;
    }

    get contractType() {
        return this.job.contractType;
    }

    get jobLevel() {
        return this.job.seniority;
    }

    get jobDateCreated() {
        return this.$dateRelative( this.job.dateCreated );
    }

    async fetch() {
        const { params } = this.$nuxt.context;
        const { id } = params;

        try {
            await JobService.select( { id } );
        } catch ( reason ) {
            throw reason;
        }
    }

    async mounted() {
        const { params } = this.$nuxt.context;
        const { id } = params;

        try {
            await JobService.select( { id } );
        } catch ( reason ) {
            throw reason;
        }
    }

    async onClickShowJobOffersList() {
        this.$router.back()
    }
}
