import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GCompanyCity',
    components: { }
} )

export default class GCompanyCity extends Vue {
    @Prop( { type: String, required: true } ) location;
}
