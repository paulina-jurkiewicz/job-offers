import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GHeadline',
    components: {
        myComponent: {
            props: [ 'tag' ],
            render( createElement: any  ) {
                // @ts-ignore
                return createElement( this.tag || 'div', {}, this.$slots.default );
            }
        }
    },

} )

export default class GHeadline extends Vue {
    @Prop( { type: String, required: true } ) text;
    @Prop( { type: String, required: true } ) tag;
}
