import { Component, Prop, Vue }         from '~/node_modules/nuxt-property-decorator';
import GIconRoundedSmall                from '~/components/Atoms/IconRoundedSmall/IconRoundedSmall';

@Component( {
    name: 'GBoxRounded',
    components: { GIconRoundedSmall }
} )
export default class GCard extends Vue {
    @Prop( { type: String, required: false } ) className;
}
