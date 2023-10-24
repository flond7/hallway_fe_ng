/* export class globalConstants {
  public static GOAL_WEIGHT: Array<string> = ['Facile', 'Media difficoltà', 'Alta difficoltà'];
  public static MAXIMUM_NUMBER = 10;
}; */

export const GOAL_WEIGHT: Array<object> = [{text: 'Facile', value: 1}, {text: 'Media difficoltà', value: 2}, {text: 'Alta difficoltà', value: 3},];
export const GOAL_TYPE: Array<string> = ['Ordinario', 'Straordinario'];
export const MAXIMUM_NUMBER = 10;


export const INFO_GOAL_TYPE = "Gli obbiettivi possono essere ordinari, in questo caso hanno degli indicatori (es: numero di pratiche edilizie, numero di accessi agli atti...), oppure straordinari (es: preparazione e approvazione di un nuovo regolamento, gestione di bando straordinario...)";
export const INFO_GOAL_PHASE = "";


//ACCESSO AGLI ATTI
export const AA_APPLICANT_TYPE: Array<string> = ['Privato cittadino', 'Ente pubblico'];
export const AA_TYPES: Array<string> = ['Semplice', 'Generalizzato'];
export const AA_RESULT: Array<string> = ['Positivo', 'Negativo'];