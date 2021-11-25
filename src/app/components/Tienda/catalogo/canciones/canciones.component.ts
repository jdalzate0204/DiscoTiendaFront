import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidacionComponent } from 'src/app/components/Principal/validacion/validacion.component';
import { Cancion } from 'src/app/_model/Cancion';
import { CancionSelect } from 'src/app/_model/CancionSelect';
import { Carrito } from 'src/app/_model/Carrito';
import { CancionesService } from 'src/app/_service/canciones.service';
import { VentasService } from 'src/app/_service/ventas.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  selectCancion: CancionSelect = {id: 0, nombre: ''};
  cancion!: CancionSelect[];
  idAlbum!: number;
  cancionInterfaz!: CancionInterfaz[];
  cancionesForm!: FormGroup;
  totalForm!: FormGroup;
  precioTodos: number[] = [];
  total!: number;
  cancionInfo: Cancion[] = [];
  descripcion!: string;
  opcionElegida!: number;

  constructor(private cancionService: CancionesService,
    private ventasService: VentasService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) { 
      this.cancionesForm = this.createFormGroupCancion();
      this.totalForm = this.createFormGroupTotal();
      this.cancionInterfaz = [];
    }

  createFormGroupCancion() {
    return new FormGroup({
      nombreCancion: new FormControl('', [Validators.required])
    });
  }

  createFormGroupTotal() {
    return new FormGroup({
      precioTotal: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAlbum = params.id;

      if (this.idAlbum != undefined) {
        this.cancionService.getSelectCancion(this.idAlbum).subscribe( data => {
          this.cancion = data;
        });
      }
    });
  }

  mensajeError() {
    let error: string[] = [];

    if(this.cancionesForm.controls.nombreCancion.hasError('required')) {
      error.push("Seleccione una canción");
    }

    return error;
  }

  agregarCancion() {
    if (this.cancionesForm.valid) {      
      const value = this.cancionesForm.value;

      this.cancionService.getListarCancionId(value.nombreCancion).subscribe( data => {
        data.forEach(element => {
          let cancionNueva: CancionInterfaz = new CancionInterfaz();

          cancionNueva.id = element.id;
          cancionNueva.nombre = element.nombre;
          cancionNueva.descripcion = element.descripcion;
          cancionNueva.formato = element.formato;
          cancionNueva.precio = element.precio;
          cancionNueva.album = element.album;

          this.cancionInterfaz.push(cancionNueva);
        });
      });
      this.onResetForm();
    } else {
      let error = this.mensajeError();

      this._snackBar.openFromComponent(ValidacionComponent, {
        data: error,
        duration: 5000
      });
    }
  }

  cargarDescripcion(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.descripcion = this.cancionInfo.filter(cancion => cancion.id == parseInt(elemento.value))[0].descripcion;
    this.opcionElegida = parseInt(elemento.value);
  }

  calcularTotal() {
    this.cancionInterfaz.forEach(element => {
      let precio = element.precio;

      this.precioTodos.push(precio);
      this.total = 0;

      for(let i of this.precioTodos) {
        this.total += i;
      }
    });
  }

  onResetForm() {
    this.cancionesForm.reset();

    Object.keys(this.cancionesForm.controls).forEach(key => {
      this.cancionesForm.get(key)?.setErrors(null);
    });
  }

  agregarCarrito() {
    if(this.cancionInterfaz.length == 0) {
      this._snackBar.open('No ha seleccionado ninguna canción', 'cerrar', {
        duration: 5000
      });

    } else {
      this.cancionInterfaz.forEach(element => {
        let carrito: Carrito = new Carrito();
        carrito.cancion = element.nombre;
        carrito.precio = element.precio;
        carrito.album = element.album;
        carrito.estado = false;

        this.ventasService.postAgregarCarrito(carrito).subscribe( data => {
          this._snackBar.open('Productos añadidos', 'cerrar', {
            duration: 5000
          });
          this.router.navigate(['/catalogo']);
        });
      })
    }
  }
}

class CancionInterfaz {
  id!: number;
  nombre!: string;
  precio!: number;
  formato!: string;
  album!: string;
  descripcion!: string;
}
