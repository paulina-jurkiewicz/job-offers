import { Component, Prop, Vue }         from '~/node_modules/nuxt-property-decorator';
import { IJob }                         from '~/interfaces/Job/IJob';
import GCompanyLogo                     from '~/components/Atoms/CompanyLogo/CompanyLogo';
import GJobOfferTitle                   from '~/components/Atoms/JobOfferTitle/JobOfferTitle';
import GCompanyName                     from '~/components/Atoms/CompanyName/CompanyName';
import GCompanyCity                     from '~/components/Atoms/CompanyCity/CompanyCity';
import GJobOfferSalary                  from '~/components/Atoms/JobOfferSalary/JobOfferSalary';
import GLabelRounded                    from '~/components/Atoms/LabelRounded/LabelRounded';

@Component( {
    name: 'GJobItem',
    components: { GCompanyLogo, GJobOfferTitle, GCompanyName, GCompanyCity, GJobOfferSalary, GLabelRounded }
} )
export default class GJobItem extends Vue {
    @Prop( { type: Object, required: true } ) job: IJob;

    get companyLogoUrl() {
        return this.job.company.logoUrl;
    }

    get companyName() {
        return this.job.company.name;
    }
    get companyLocation() {
        return this.job.company.location.city;
    }

    get jobTitle() {
        return this.job.title;
    }

    get jobInterviewOnline() {
        return this.job.onlineInterview;
    }
    get jobRemote() {
        return this.job.remote;
    }

    get jobSalary() {
        return this.job.salary;
    }

    get jobDateAdded() {
        return this.$dateRelative(this.job.dateCreated);
    }

    get jobTags() {
        return this.job.tags;
    }

    get jobOfferId() {
        return this.job.id;
    }

    get jobCategory() {
        return this.job.category;
    }

    get jobVariant() {
        return `variant-${ this.jobCategory }`
    }

    onClickJobOffer( e: Event ) {
        e.preventDefault();

        this.$emit( 'on-click-job-offer', this.jobOfferId )
    }
}
