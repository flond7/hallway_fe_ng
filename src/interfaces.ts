export interface PegOffice {
    id: number;
    name: string;
}

export interface PegPoOffice {
    id: number;
    name: string;
    manager: PegPerson;    
}
export interface PegPerson {
    id: number;
    name: string;
    surname: string;
    jobCategory: string;
    manager: boolean;
    managerOfOffices: Array<PegOffice>;
    added?: boolean
}

export interface PegGoal {
    id: number;
    name: string;
    description: string;
    weight: number;
    manager: PegPerson | null;
    office: PegOffice;
    year: number;
    involvedPeople: number[];
    percent_3006: number;
    weight_3006?: number;
    percent_3112: number;
    weight_3112?: number;
    type: string;
}