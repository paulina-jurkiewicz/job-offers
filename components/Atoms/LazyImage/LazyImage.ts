import { Component, Prop, Vue } from '~/node_modules/nuxt-property-decorator';
import LazyLoad                 from '~/directives/LazyLoad';
import ImageSpinner             from '~/components/Atoms/ImageSpinner/ImageSpinner';

@Component( {
    // @ts-ignore
    name: 'GLazyImage',
    directives: {
        lazyload: LazyLoad
    },
    components: {
        ImageSpinner
    }
} )
export default class GLazyImage extends Vue {
    @Prop( { type: String, required: true } ) readonly source;
    @Prop( { type: String, required: true } ) readonly alt;
}
