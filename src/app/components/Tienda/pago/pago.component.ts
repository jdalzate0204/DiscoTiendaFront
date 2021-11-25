import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Pago } from 'src/app/_model/Pago';
import { Venta } from 'src/app/_model/Venta';
import { VentasService } from 'src/app/_service/ventas.service';
import { environment } from 'src/environments/environment';
import { ValidacionComponent } from '../../Principal/validacion/validacion.component';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  selectPago: Pago = {id: 0, descripcion: ''};
  pago!: Pago[];
  clienteForm!: FormGroup;
  pagoForm!: FormGroup;
  arrayCantidad!: number[];
  arrayTotal!: number[];
  cantidad!: number;
  total!: number;
  estado!: boolean;

  constructor(private ventaService: VentasService,
    private _snackBar: MatSnackBar,
    private router: Router) { 
      this.clienteForm = this.createFormGroupCliente();
      this.pagoForm = this.createFormGroupPago();
    }

  createFormGroupCliente() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required])
    });
  }

  createFormGroupPago() {
    return new FormGroup({
      pago: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.ventaService.getSelectPago().subscribe( data => {
      this.pago = data;
    });

    let cantidadSession: any = sessionStorage.getItem(environment.CANTIDADCANCIONES);
    let totalSession: any = sessionStorage.getItem(environment.TOTAL);
    
    let strC = cantidadSession;
    this.arrayCantidad = strC.split(',').map(Number); 
    
    let strT = totalSession;
    this.arrayTotal = strT.split(',').map(Number); 

    this.cantidad = 0;
    this.arrayCantidad.forEach(element => {
      this.cantidad += element;
    });

    this.total = 0;
    this.arrayTotal.forEach(element => {
      this.total += element;
    });
  }

  mensajeError() {
    let error: string[] = [];

    if(this.clienteForm.controls.nombre.hasError('required')){
      error.push("Ingrese el nombre del cliente");
    }

    if(this.clienteForm.controls.apellido.hasError('required')){
      error.push("Ingrese el apellido del cliente");
    }

    if(this.clienteForm.controls.celular.hasError('required')){
      error.push("Ingrese el celular del cliente");
    }

    if(this.clienteForm.controls.correo.hasError('required') && this.clienteForm.controls.correo.hasError('email')){
      error.push("Ingrese un correo electrónico valido");
    }

    if(this.clienteForm.controls.direccion.hasError('required')){
      error.push("Ingrese la dirección del cliente");
    }

    if(this.pagoForm.controls.pago.hasError('required')) {
      error.push("Seleccione un metodo de pago");
    }

    return error;
  }

  comprar(event: Event) {
    let error = this.mensajeError();

    if (error.length > 0) {
      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 5000
      });
    }

    if (error.length == 0) {
      const valueCliente = this.clienteForm.value;
      const valuePago = this.pagoForm.value;

      let venta: Venta = new Venta();

      const name = valueCliente.nombre;
      const lastname = valueCliente.apellido;

      venta.nombreCliente = (name.concat(' ', lastname));
      venta.celular = valueCliente.celular;
      venta.correo = valueCliente.correo;
      venta.direccion = valueCliente.direccion;

      moment.locale("es");
      let fechaCompra = new Date();
      let fechaFormato = moment(fechaCompra).format("YYYY-MM-DD");

      venta.fechaCompra = fechaFormato;
      venta.cantidadArticulos = this.cantidad;
      venta.total = this.total;
      venta.idPago = valuePago.pago;

      let factura = JSON.stringify(venta); 

      sessionStorage.setItem(environment.DATOSVENTA, factura);

      this.ventaService.postGuardarHistorial(venta).subscribe(data => {
        this.estado = true;
        this.ventaService.putEditarEstadoCarrito(this.estado).subscribe();

        sessionStorage.removeItem(environment.CANTIDADCANCIONES);
        sessionStorage.removeItem(environment.TOTAL);

        this._snackBar.open('Compra existosa', 'Cerrar', {
          duration: 5000
        });
        this.router.navigate(['/factura']);
      }, err => {
        if(err.status == 400) {
          this._snackBar.open(err.error.mensaje, 'Cerrar', {
            duration: 5000
          });
        }
      });
    }
  }
}
