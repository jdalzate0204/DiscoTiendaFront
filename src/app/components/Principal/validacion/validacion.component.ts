import { Component, Inject, OnInit } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  informacion!: string[];

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string[]) { 
    this.informacion = data;
  }

  ngOnInit(): void {
  }

}
