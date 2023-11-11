//GENERAL
export const NAME_PA: string = 'Magnifica comunità montana';
export const BASE_URL: string = 'http://127.0.0.1:8000/';
export const HTTP_OPTIONS = {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Skip-Interceptor': 'true'
};

//COLORS
export const COLOR_PRIMARY_PEG: string = '#fecf6c';
export const COLOR_DARK: string = '#22252f';
export const COLOR_WHITE: string = '#ffffff';

//MODALS
export const MODAL_DELETE: string = 'Vuoi davvero cancellare questo elemento?';
export const MODAL_MESSAGE_CREATION_OK: string = 'I record sono stati creati correttamente';

export const MAXIMUM_NUMBER = 10;


export const INFO_GOAL_TYPE = "Gli obbiettivi possono essere ordinari, in questo caso hanno degli indicatori (es: numero di pratiche edilizie, numero di accessi agli atti...), oppure straordinari (es: preparazione e approvazione di un nuovo regolamento, gestione di bando straordinario...)";
export const INFO_GOAL_PHASE = "";

//PEG
export const PEG_GOAL_EXTRAORDINARY_TITLE: string = "Obbiettivi straordinari"
export const PEG_GOAL_ORDINARY_TITLE: string = "Obbiettivi ordinari"
export const PEG_ALERT_WEIGHT: string = "La somma del peso di tutti gli obbiettivi deve essere 100"
export const PEG_ALERT_PO_OFFICE: string = "Devi selezionare il responsabile e l'ufficio"
export const PEG_INSTRUCTIONS = {
  'weight': "valore compreso tra 1 e 100, indica l'importanza dell'obbiettivo parametrato a tutte le attività elencate e svolte dall'ufficio. I valori di tutti gli obbiettivi elencati devono essere pari a 100",
  'percent_3006': "percentuale dell'obbiettivo raggiunta al 30/06",
  'weight_3006': "valore calcolato automaticamente: peso parametrato alla percentuale obbiettivo raggiunta al 30/06",
  'percent_3112': "percentuale dell'obbiettivo raggiunta al 31/12",
  'weight_3112': "valore calcolato automaticamente: peso parametrato alla percentuale obbiettivo raggiunta al 31712",
}
export const PEG_PDF_ACCESS_KEYS: Array<string> = ['Nome','Ufficio', 'Peso', '% (31/12)']
export const PEG_PDF_STATS_TEXT: string = "Percentuale di obbiettivi assegnati e realizzati al 31/12: "


//ACCESSO AGLI ATTI
export const AA_APPLICANT_TYPE: Array<string> = ['Privato cittadino', 'Ente pubblico'];
export const AA_TYPES: Array<string> = ['Accesso civico c.d. semplice ex art. 5, c.1 del D.Lgs. 33/2013', 'Accesso civico generalizzato ex art. 5, c.2 del D.Lgs. 33/2013 (Foia)'];
export const AA_RESULT: Array<string> = ['Positivo', 'Negativo', 'Accolta parzialmente'];

//PDF
/* export const PDF_ACCESS_KEYS: Array<string> = [
  'id', 'Prot', 'Data protocollo', 'Richiedente', 'Tipo richiesta', 'Oggetto', 'Controinteressati', 'Responsabile', 'Esito', 'Protocollo risposta', 'answerDate', 'Note'
] */
export const PDF_ACCESS_KEYS: Array<string> = [
  'Richiesta', 'Richiedente', 'Tipo richiesta', 'Oggetto', 'Controinteressati', 'Responsabile', 'Esito', 'Risposta', 'Note'
]
export const PDF_STYLE = {
  header: {
    fontSize: 22,
    bold: true
  },
  subheader: {
    fontSize: 18,
    bold: true
  },
  h2: {
    fontSize: 18,
    bold: false
  }
}
