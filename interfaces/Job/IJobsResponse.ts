import { IJobResponse } from "~/interfaces/Job/IJobResponse";

export interface IJobsResponse {
	results: IJobResponse[];
	total: number;
}