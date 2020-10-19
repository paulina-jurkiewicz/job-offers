import { ILocation } from "~/interfaces/Job/ILocation";

export interface ICompany {
	name: string;
	logoUrl: string;
	size: number;
	location: ILocation;
}
