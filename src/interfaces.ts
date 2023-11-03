export interface PegPerson {
    id: number;
    name: string;
    surname: string;
    jobCategory: string;
    manager: boolean;
    managerOffice: Array<Array <string>>;
    added?: boolean
}

export interface PegGoal {
    id: number;
    name: string;
    description: string;
    weight: number;
    manager: PegPerson | null;
    office: string;
    year: number;
    involvedPeople: PegPerson[];
    percent_3006: number;
    weight_3006?: number;
    percent_3112: number;
    weight_3112?: number;
}