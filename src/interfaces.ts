export interface PegPerson {
    id: number;
    name: string;
    surname: string;
    jobCategory: string;
    added?: boolean
}

export interface PegOffice {
    id: number;
    name: string;
    responsable: PegPerson;
}

export interface PegGoal {
    id: number;
    name: string;
    description: string;
    weight: number;
    responsable: PegPerson;
    office: PegOffice;
    year: number;
    involvedPeopls: PegPerson[];
}