import { ICompany } 		from "~/interfaces/Job/ICompany";
import { ISalary } 			from "~/interfaces/Job/ISalary";

export interface IJobResponse {
	id: string;
	title: string;
	category: string;
	company: ICompany;
	salary: ISalary;
	seniority: string;
	tags: string[];
	dateCreated: string;
	onlineInterview: boolean;
	remote: boolean;
	contractType: string;
	content: string;
}