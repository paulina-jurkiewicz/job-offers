import { Component, Emit, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { BFormCheckbox, BFormGroup }         from '~/node_modules/bootstrap-vue';

@Component( {
    name: 'GFilterCategory',
    components: { BFormGroup, BFormCheckbox },
    watchQuery: [ 'isSelected' ]
} )

export default class GFilterCategory extends Vue {
    @Prop( { type: String, required: false } ) category;
    @Prop( { type: Boolean, required: false } ) isSelected;

    private categoryValue = false;

    created() {
        if ( this.isSelected )  {
            this.categoryValue = this.category;
        }
    }

    @Watch( 'isSelected', { deep: false, immediate: false } )
    changeSelectedValue() {
        this.categoryValue = this.isSelected ? this.category: false;
    }

    get isDefaultOption() {
        return this.category === 'all';
    }

    get iconClassName() {
        return `flaticon-${ this.category.toLowerCase() }`
    }

    get categoryVariant() {
        return `variant-${ this.category.toLowerCase() }`
    }

    onChangeCategoryFilter(){
        this.$emit('onChangeCategoryFilter', this.category )
    }
}
