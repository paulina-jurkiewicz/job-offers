import {Component, Emit, Vue} from 'nuxt-property-decorator';
import {BButton}              from '~/node_modules/bootstrap-vue';

@Component( {
    name: 'GButtonPrev',
    components: { BButton }
} )

export default class GButtonPrev extends Vue {
    @Emit( 'onClickGoBack' )
    onClickGoBack() {}
}
