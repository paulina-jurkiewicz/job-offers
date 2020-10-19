import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GCompanyName',
    components: {  }
} )

export default class GCompanyName extends Vue {
    @Prop( { type: String, required: true } ) name;
}
