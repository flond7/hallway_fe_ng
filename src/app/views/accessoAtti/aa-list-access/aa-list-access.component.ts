import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { AccessoAttiApiService } from '../../../services/accessoAtti-api.service';
import * as GC from '../../../../constants'

/* import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; */
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { single } from 'rxjs';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

enum PageOrientation {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

@Component({
  selector: 'app-aa-list-access',
  templateUrl: './aa-list-access.component.html',
  styleUrls: ['./aa-list-access.component.sass']
})

export class AaListAccessComponent implements OnInit {

  year: number = 2023;
  list = [];

  //PDF
  pdfTitle: string = "";
  pdfBody = [GC.PDF_ACCESS_KEYS];
  pdfWidths = ['auto'];
  arrayOfKeys = GC.PDF_ACCESS_KEYS; 

  constructor(public api: AccessoAttiApiService) { }

  ngOnInit() { }

  getAccessRegister(y: number) {
    this.api.getAccessList().subscribe(r => { this.list = r.data })
  }

  // Iterate through all data and get the singleAccess data, 
  // take all the values and push them inside the pdfTable

  createPdfTable(accessList: object[]) {
    let numberOfWidths = GC.PDF_ACCESS_KEYS.length;
    this.pdfWidths.length = numberOfWidths;
    this.pdfWidths.fill('auto', 0, numberOfWidths);

    accessList.forEach(singleAccess => {
      let arrayOfValues = Object.values(singleAccess);
      // merge prot number and date
      // protNum = arrayOfValues[1]    protDate = arrayOfValues[2];
      let startDate = arrayOfValues[10].split('-').reverse().join('/')
      let startProt = arrayOfValues[1] + " del " + startDate;
      let endDate = arrayOfValues[10].split('-').reverse().join('/')
      let endProt = arrayOfValues[9] + " del " + endDate;
      // clean the array and push inside the new protocols
      arrayOfValues.splice(1,2,startProt);
      arrayOfValues.splice(8,2,endProt);
      arrayOfValues.splice(0,1);
      this.pdfBody.push(arrayOfValues);  
    });
  }


  generatePdf() {
    this.createPdfTable(this.list);
    this.pdfTitle = "Registro degli accessi " + this.year

    const documentDefinition = {
      pageOrientation: PageOrientation.Landscape,
      content: [
        { text: this.pdfTitle, style: 'header' },
        { text: ' ' }, //empty line for aesthetic purposes
        {
          table: {
            headerRows: 1,
            widths: this.pdfWidths,
            body: this.pdfBody,
          }
        }
      ],
      styles: GC.PDF_STYLE
    };

    pdfMake.createPdf(documentDefinition).open();
  }
}