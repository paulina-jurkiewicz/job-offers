import { Component, Prop, Vue }     from 'nuxt-property-decorator';
import GLazyImage                   from '~/components/Atoms/LazyImage/LazyImage';

@Component( {
    name: 'GCompanyLogoRounded',
    components: { GLazyImage }
} )

export default class GCompanyLogoRounded extends Vue {
    @Prop( { type: String, required: true } ) logoUrl;
    @Prop( { type: String, required: true } ) name;
}
