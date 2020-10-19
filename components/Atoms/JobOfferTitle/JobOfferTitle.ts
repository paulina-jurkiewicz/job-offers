import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GJobOfferTitle'
} )

export default class GJobOfferTitle extends Vue {
    @Prop( { type: String, required: true } ) title;
    @Prop( { type: String, required: true } ) variant;
}
