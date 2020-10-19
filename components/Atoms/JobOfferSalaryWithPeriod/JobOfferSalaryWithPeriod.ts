import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GJobOfferSalaryWithPeriod'
} )

export default class GJobOfferSalaryWithPeriod extends Vue {
    @Prop( { type: Object, required: true } ) salary;

    get salaryText() {
        if ( this.salary.min === this.salary.max ) {
            return `${ this.salary.min } - ${ this.salary.max } ${ this.salary.currency }`;
        }

        return `${ this.salary.min } - ${ this.salary.max } ${ this.salary.currency } ${ this.salary.type }/${ this.periodTranslation }`;
    }

    get periodTranslation() {
        return this.$t('job-offer.salary.period.' + this.salary.period );
    }
}
