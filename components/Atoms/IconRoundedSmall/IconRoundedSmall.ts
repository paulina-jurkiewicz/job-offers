import { Component, Prop, Vue }         from '~/node_modules/nuxt-property-decorator';

@Component( {
    name: 'GIconRoundedSmall',
    components: {  }
} )
export default class GIconRoundedSmall extends Vue {
    @Prop( { type: String, required: true } ) iconName;

    get iconClassName() {
        return `flaticon-${this.iconName}`
    }
}
