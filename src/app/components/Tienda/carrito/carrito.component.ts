import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CarritoListar } from 'src/app/_model/CarritoListar';
import { VentasService } from 'src/app/_service/ventas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  carritoMostrar!: CarritoListar[];
  arrayCantidad: number[] = [];
  arrayTotal: number[] = [];

  constructor(private ventasService: VentasService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ventasService.getListarCarrito().subscribe(data => {
      this.carritoMostrar = data;
      
      data.forEach(element => {
        let cantidadCanciones = element.numeroCanciones;
        let total = element.total;

        this.arrayCantidad.push(cantidadCanciones);
        this.arrayTotal.push(total);
      });
    });
  }

  realizarCompra() {
    if(this.carritoMostrar.length == 0) {
      this._snackBar.open('No hay producto en el carrito', 'cerrar', {
        duration: 5000
      });
    } else {
      sessionStorage.setItem(environment.CANTIDADCANCIONES, this.arrayCantidad.toString());
      sessionStorage.setItem(environment.TOTAL, this.arrayTotal.toString());
      this.router.navigate(['/pago']);
    }
  }

}
