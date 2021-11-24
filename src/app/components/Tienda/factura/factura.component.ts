import { Component, OnInit } from '@angular/core';
//import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  export() {

    /*const options = {
      filename: "FacturaJAALmusic.pdf",
      image: { type: 'jpeg' },
      html2canvas: {scale: 2},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait'}
    };
    const element = document.getElementById('content');
    html2pdf().from(element).set(options).save();*/

  }
}
