import {Component, Emit, Prop, Vue}         from '~/node_modules/nuxt-property-decorator';
import GCompanyLogoRounded                  from '~/components/Atoms/CompanyLogoRounded/CompanyLogoRounded';
import GJobOfferTitle                       from '~/components/Atoms/JobOfferTitle/JobOfferTitle';
import GJobOfferSalaryWithPeriod            from '~/components/Atoms/JobOfferSalaryWithPeriod/JobOfferSalaryWithPeriod';
import GCompanyFullLocation                 from '~/components/Atoms/CompanyLocation/CompanyLocation';
import GButtonPrev                          from '~/components/Atoms/ButtonPrev/ButtonPrev';
import { IJob }                             from '~/interfaces/Job/IJob';
import GLabelRounded                        from '~/components/Atoms/LabelRounded/LabelRounded';

@Component( {
    name: 'GJobOfferHeader',
    components: { GCompanyLogoRounded, GJobOfferTitle, GJobOfferSalaryWithPeriod, GCompanyFullLocation, GButtonPrev, GLabelRounded }
} )
export default class GJobOfferHeader extends Vue {
    @Prop( { type: Object, required: true } ) job: IJob;
    @Prop( { type: String, required: true } ) variant;

    get jobCompany() {
        return this.job.company;
    }
    get companyName() {
        return this.jobCompany.name;
    }

    get companyLogoUrl() {
        return this.jobCompany.logoUrl;
    }

    get companyLocation() {
        return this.jobCompany.location;
    }

    get jobSalary() {
        return this.job.salary;
    }

    get jobTitle() {
        return this.job.title;
    }


    get jobRemote() {
        return this.job.remote;
    }

    get jobInterviewOnline() {
        return this.job.onlineInterview;
    }

    @Emit('onClickGoBack')
    onClickGoBack( e ){}
}
