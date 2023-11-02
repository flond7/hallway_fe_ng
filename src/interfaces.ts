export interface PegPerson {
    id: number;
    name: string;
    surname: string;
    jobCategory: string;
    responsable: boolean;
    responsableOffice: Array<Array <string>>;
    added?: boolean
}

export interface PegGoal {
    id: number;
    name: string;
    description: string;
    weight: number;
    responsable: PegPerson | null;
    office: string;
    year: number;
    involvedPeople: PegPerson[];
    completation3006: number;
    completation3112: number;
}