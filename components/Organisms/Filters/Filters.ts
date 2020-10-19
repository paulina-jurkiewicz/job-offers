import { Component, Vue, Watch } from '~/node_modules/nuxt-property-decorator';
import {
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormRadio,
    BFormRadioGroup,
    BFormSelect
} from '~/node_modules/bootstrap-vue';
import GFilterCategory from '~/components/Atoms/FilterCategory/FilterCategory';

@Component( {
    name: 'GFilters',
    components: {
        BFormGroup,
        BFormCheckbox,
        BForm,
        GFilterCategory,
        BFormRadioGroup,
        BFormRadio,
        BFormSelect
    },
    watchQuery: []

} )
export default class GFilters extends Vue {
    selectedCategory = 'all';
    selectedRegion = 'all';
    selectedSeniority = '';
    sortType = '';

    get seniorityOptions() {
        return [
            { text: 'All', value: '' },
            { text: 'Junior', value: 'junior' },
            { text: 'Mid', value: 'middle' },
            { text: 'Senior', value: 'senior' }
        ];
    }

    get categories() {
        return [ 'JS', 'HTML5', 'PHP', 'java', 'python' ]
    }

    get regionOptions() {
        return [
            { value: 'all', text: 'Lokalizacja' },
            { value: 'kielce', text: 'Kielce' },
            { value: 'warszawa', text: 'Warszawa' },
            { value: 'krakow', text: 'Kraków' },
            { value: 'poznan', text: 'Poznań' }
        ];
    }

    get sortOptions() {
        return [
            { value: '', text: 'Najnowsze' },
            { value: 'highest-salary', text: 'Najwyższe wynagrodzenie' },
            { value: 'lowest-salary', text: 'Najniższe wynagrodzenie' }
        ];
    }

    get isSelectedAllCategories() {
        return this.selectedCategory === 'all';
    }

    get routeParams() {
        return this.$route.params;
    }

    get queryParams() {
        return this.$route.query;
    }

    @Watch( 'selectedCategory', { deep: false, immediate: false } )
    onChangeSelectedCategories() {
        this.changeUrlAfterFilter();
    }

    @Watch( 'selectedRegion', { deep: false, immediate: false } )
    onChangeSelectedRegion() {
        this.changeUrlAfterFilter();
    }

    @Watch( 'selectedSeniority', { deep: false, immediate: false } )
    onChangeSelectedSeniority() {
        this.changeUrlAfterFilter();
    }

    @Watch( 'sortType', { deep: false, immediate: false } )
    onChangeSortType() {
        this.changeUrlAfterFilter();
    }

    get queryElements() {
        const query = {};

        if ( this.selectedSeniority.length ) {
            query[ 'seniority' ] = this.selectedSeniority;
        }

        if ( this.sortType.length ) {
            query[ 'sortType' ] = this.sortType;
        }

        return query;
    }

    isCategorySelected( category: string ) {
        return this.isSelectedAllCategories || this.selectedCategory.toLowerCase() === category.toLowerCase();
    }

    mounted() {
        this.displayUrlQueryFilters();
    }

    displayUrlQueryFilters() {
        this.selectedRegion = this.routeParams.region ? this.routeParams.region : 'all';
        this.selectedCategory = this.routeParams.category ? this.routeParams.category : 'all';

        if ( this.queryParams.seniority ) {
            this.selectedSeniority = String( this.queryParams.seniority );
        }

        if ( this.queryParams.sortType ) {
            this.sortType = String( this.queryParams.sortType );
        }
    }

    async changeUrlAfterFilter() {
        const route = this.$router.resolve( {
            name: 'job_items',
            params: { 0: '', category: this.selectedCategory.toLowerCase(), region: this.selectedRegion },
            query: this.queryElements
        } );

        try {
            await this.$router.push( route.href );
        } catch ( reason ) {
            throw reason;
        }
    }
}
