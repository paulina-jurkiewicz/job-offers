import { Action, getModule, Module, Mutation, VuexModule }  from 'vuex-module-decorators';
import store                                                from '~/store/index';
import ApiJobs                                              from '~/api/apiJobs';
import { IJob }                                             from '~/interfaces/Job/IJob';
import { IJobResponse }                                     from '~/interfaces/Job/IJobResponse';
import { Slug }                                             from '~/tools/Slug';

/**
 * @module Job
 * @class {Job}
 * @extends {VuexModule}
 * @dynamic
 * @namespaced
 */
@Module( {
    name: 'job',
    stateFactory: true,
    dynamic: true,
    namespaced: true,
    preserveState: false,
    store: store()
} )

class Job extends VuexModule {
    public total = 0;
    public currentPage = 1;
    public selected = {};
    public jobs: IJob[] = [];
    public loading: boolean = true;

    /**
     * @public
     * @returns {Promise<void>}
     */
    @Action({ rawError: true })
    public async fetch( { category, region, query, page = 1 } ) {
        try {
            this.SET_LOADING( true );

            const categoryValue = category && category !== 'all' ? category : '';
            const regionValue = region && region !== 'all' ? region : '';
            const seniority = query.seniority ? query.seniority : '';
            const sortType = query.sortType ? query.sortType : '';

            let response: IJobResponse[] = await ApiJobs().getAll( {
                category: categoryValue,
                region: regionValue,
                query
            } );

            if ( categoryValue.length ) {
                response = response.filter( ( job: IJob ) => job.category.toLowerCase() === categoryValue.toLowerCase() );
            }

            if ( regionValue.length ) {
                response = response.filter( ( job: IJob ) => new Slug( job.company.location.city ).getValue() === regionValue.toLowerCase() );
            }

            if ( seniority.length ) {
                response = response.filter( ( job: IJob ) => job.seniority === seniority );
            }

            if ( sortType.length && sortType === 'lowest-salary' ) {
                response = response.sort( ( a, b ) => a.salary.min - b.salary.min );
            } else if ( sortType.length && sortType === 'highest-salary' ) {
                response = response.sort( ( a, b ) => b.salary.max - a.salary.max );
            } else {
                // @ts-ignore
                response = response.sort( ( a, b ) => new Date( b.dateCreated ) - new Date( a.dateCreated ) );
            }

            let total = response.length;

            this.SET_JOBS( response );
            this.SET_CURRENT_PAGE( page );
            this.SET_TOTAL( total );
            this.SET_LOADING( false );
        } catch ( reason ) {
            this.SET_LOADING( false );

            throw reason;
        }
    }

    /**
     * @public
     * @returns {IJob}
     */
    @Action({ rawError: true })
     select( { id }: { id: string } ) {
        const job: IJob = this.jobs.find( ( job: IJob ) => job.id === id );

        this.SET_SELECTED( job );
    }

    /**
     * @public
     */
    @Action
    public clearSelect() {
        this.SET_SELECTED( undefined );
    }

    /**
     * @private
     * @param {IJobResponse[]} jobs
     * @constructor
     */
    @Mutation
    private SET_JOBS( jobs: IJobResponse[] ) {
        this.jobs = [ ...jobs ];
    }

    /**
     * @private
     * @param {number} page
     * @constructor
     */
    @Mutation
    private SET_CURRENT_PAGE( page: number ) {
        this.currentPage = page;
    }

    /**
     * @private
     * @param {number} total
     * @constructor
     */
    @Mutation
    private SET_TOTAL( total: number ) {
        this.total = total;
    }

    /**
     * @private
     * @param {IJob | undefined} selected
     * @constructor
     */
    @Mutation
    private SET_SELECTED( selected: IJob | undefined ) {
        this.selected = selected && { ...selected };
    }

    /**
     * @private
     * @param {boolean} loading
     * @constructor
     */
    @Mutation
    private SET_LOADING( loading: boolean ) {
        this.loading = loading;
    }
}

/**
 * @type {Job}
 * @public
 */
export const JobService = getModule( Job );
