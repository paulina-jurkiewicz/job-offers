import { Component, Prop, Vue }         from '~/node_modules/nuxt-property-decorator';
import GCard                            from '~/components/Molecules/Card/Card';

@Component( {
    name: 'GJobOfferContent',
    components: { GCard }
} )
export default class GJobOfferContent extends Vue {
    @Prop( { type: String, required: true } ) jobContent;
}
