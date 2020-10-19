import {IJobResponse} from "~/interfaces/Job/IJobResponse";

const getAll = () => import( '~/static/jobs/jobs.json' ).then( ( m ) => m.default || m );

const ApiJobs = () => ( {
    getAll({ category, region, query = {} }): Promise<IJobResponse[]> {
        return getAll();
    }
} );

export default ApiJobs;
