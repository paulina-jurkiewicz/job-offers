import { Component, Prop, Vue }          from '~/node_modules/nuxt-property-decorator';
import GCard                             from '~/components/Molecules/Card/Card';
import GIconRoundedSmall                 from '~/components/Atoms/IconRoundedSmall/IconRoundedSmall';
import GHeadline                         from '~/components/Atoms/Headline/Headline';

@Component( {
    name: 'GJobOfferDetails',
    components: { GCard, GIconRoundedSmall, GHeadline }
} )
export default class GJobOfferDetails extends Vue {
    @Prop( { type: String, required: true } ) companySize;
    @Prop( { type: String, required: true } ) companyName;
    @Prop( { type: String, required: true } ) contractType;
    @Prop( { type: String, required: true } ) seniority;
    @Prop( { type: String, required: true } ) createdAt;
}
