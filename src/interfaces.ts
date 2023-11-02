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
    responsable: PegPerson | null;
    office: PegOffice | null;
    year: number;
    involvedPeople: PegPerson[];
    completation3006: number;
    completation3112: number;
}