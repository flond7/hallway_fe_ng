export interface PegPerson {
    name: string;
    surname: string;
    jobCategory: string;
    added?: boolean
}

export interface PegPhase {
    name: string;
    surname: string;
    jobCategory: string;
    added?: boolean
}

export interface PegPegGoal {
    name: string;
    description: string;
    weight: string;
    type: string;
    people: Array<PegPerson>;
    phases?: Array<PegPhase>;
    marker?: string;
}

export interface PegIndicator {
    name: string;
    valueStart: string;
    valueEnd: string;
}