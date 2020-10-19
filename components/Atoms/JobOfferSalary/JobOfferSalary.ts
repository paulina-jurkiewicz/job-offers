import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GJobOfferSalary'
} )

export default class GJobOfferSalary extends Vue {
    @Prop( { type: Object, required: true } ) salary;

    get salaryText() {
        if ( this.salary.min === this.salary.max ) {
            return `${ this.salary.min } - ${ this.salary.max } ${ this.salary.currency }`;
        }

        return `${ this.salary.min } - ${ this.salary.max } ${ this.salary.currency }`;
    }
}
