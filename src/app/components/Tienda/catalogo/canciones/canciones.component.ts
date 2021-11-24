import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ValidacionComponent } from 'src/app/components/Principal/validacion/validacion.component';
import { Album } from 'src/app/_model/Album';
import { Cancion } from 'src/app/_model/Cancion';
import { CancionSelect } from 'src/app/_model/CancionSelect';
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

  constructor(private cancionService: CancionesService,
    private route: ActivatedRoute,
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

  calcularTotal() {
    this.cancionInterfaz.forEach(element => {
      let precio = element.precio;

      this.precioTodos.push(precio);
      this.total = 0;

      for(let i of this.precioTodos) {
        this.total += i;
      }
      console.log(this.total);
    });
  }

  onResetForm() {
    this.cancionesForm.reset();

    Object.keys(this.cancionesForm.controls).forEach(key => {
      this.cancionesForm.get(key)?.setErrors(null);
    });
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
