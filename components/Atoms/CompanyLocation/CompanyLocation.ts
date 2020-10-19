import {Component, Prop, Vue} from 'nuxt-property-decorator';

@Component( {
    name: 'GCompanyLocation',
    components: { }
} )

export default class GCompanyLocation extends Vue {
    @Prop( { type: Object, required: true } ) location;

    get locationText() {
        return `${ this.location.street }, ${ this.location.city }`
    }
}
