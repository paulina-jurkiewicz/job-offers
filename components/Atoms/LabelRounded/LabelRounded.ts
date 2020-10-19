import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component( {
    name: 'GLabelRounded'
} )

export default class GLabelRounded extends Vue {
    @Prop( { type: String, required: true } ) value;
    @Prop( { type: String, required: true } ) variant;
}
