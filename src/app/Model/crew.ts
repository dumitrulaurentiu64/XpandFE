import { IRobot } from "./robot";

export interface ICrew {
    crewID: string;
    shuttleID: string;
    crewName: string;
    captainFullname: string;
    robots: IRobot[];
}