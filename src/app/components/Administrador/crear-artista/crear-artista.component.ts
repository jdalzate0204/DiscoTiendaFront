import { Component, OnInit } from '@angular/core';
import { GeneroMusical } from 'src/app/_model/GeneroMusical';
import { Sexo } from 'src/app/_model/Sexo';
import { ArtistaService } from 'src/app/_service/artistas.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionComponent } from '../../Principal/validacion/validacion.component';
import { Artista } from 'src/app/_model/Artista';

@Component({
  selector: 'app-crear-artista',
  templateUrl: './crear-artista.component.html',
  styleUrls: ['./crear-artista.component.css']
})
export class CrearArtistaComponent implements OnInit {

 selectSexo: Sexo={id:0,descripcion: ''};
 sexo!:Sexo[];
 selectGenero: GeneroMusical={id:0,descripcion: ''};
 generoMusical!:Sexo[];
 artistaForm!:FormGroup;
 artista:Artista[] = [];
 artistaMostrar: Artista[] = [];
 artistaInterfaz:ArtistaInterfaz[]=[];
 artistaInterfazFiltrados:ArtistaInterfaz[]=[];
 artistaEditar:Artista=new Artista();

  constructor(private artistasService:ArtistaService,
    private _snackBar:MatSnackBar,
    private artistaService:ArtistaService ){;
    this.artistaForm=this.createFormGroup();
    
  }

  createFormGroup() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl('', [Validators.required]),
      generoMusical: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.artistasService.getlistarGenero().subscribe(data =>{
      this.generoMusical=data;
    });
    this.artistasService.getlistarSexo().subscribe(data =>{
      this.sexo=data;
    });
    this.actualizarArtista();
    
  }

  mensajeError(){
    let error : string []=[];

    if(this.artistaForm.controls.nombre.hasError('required')){
      error.push("Ingrese el nombre");
    }
    if(this.artistaForm.controls.fechaNacimiento.hasError('required')){
      error.push("Ingrese la fecha de nacimiento");
    }
    if(this.artistaForm.controls.sexo.hasError('required')){
      error.push("Ingrese el sexo");
    }
    if(this.artistaForm.controls.nacionalidad.hasError('required')){
      error.push("Ingrese la nacionalidad");
    }
    if(this.artistaForm.controls.generoMusical.hasError('required')){
      error.push("Ingrese el genero musical");
    }
    return error;
  }

  crearArtista(event: Event){
   if(this.artistaForm.valid){
     const value =this.artistaForm.value;

     let artista:Artista=new Artista();
     artista.nombre=value.nombre;
     artista.fechaNacimiento=value.fechaNacimiento;
     artista.nacionalidad=value.nacionalidad;
     artista.idGeneroMusical=value.generoMusical;
     artista.idSexo=value.sexo;

     this.artistaService.postCrearArtista(artista).subscribe(data =>{
      this._snackBar.open('Artista registrado exitosamente','cerrar',{
        duration:3000
     })
      this.onResetForm();
     },err=>{
        if(err.status ==400){
          this._snackBar.open('Error de validaciones','cerrar',{
            duration:3000
         });

        }else if (err.status==409){
          this._snackBar.open('El artista ya esta registrado','cerrar',{
             duration:3000
          });
        }
     });

   }else{
    let error =this.mensajeError();
    this._snackBar.openFromComponent(ValidacionComponent, {
      data: error,
      duration: 5000
    });
   }
  }

  onResetForm() {
    this.artistaForm.reset();

    Object.keys(this.artistaForm.controls).forEach(key => {
      this.artistaForm.get(key)?.setErrors(null);
    });
  }

  filtrar(event: Event) {
    let elemento: HTMLInputElement = event.target as HTMLInputElement;
    this.artistaInterfazFiltrados = this.artistaInterfaz.filter(a => a.nombre.toLowerCase().includes(elemento.value.toLowerCase())
    || a.sexo.toLowerCase().includes(elemento.value.toLowerCase())
    || a.nacionalidad.toLowerCase().includes(elemento.value.toLowerCase())
    || a.generoMusical.toLowerCase().includes(elemento.value.toLowerCase()));
  }

  hacerArtistaEditable(artistaInterfaz:ArtistaInterfaz){
    artistaInterfaz.editable=true;
  }

  editarArtista(artistaInterfaz:ArtistaInterfaz){
   this.artistaService.getListarId(artistaInterfaz.id).subscribe(data=>{
     
    this.artistaEditar.id=artistaInterfaz.id;
    this.artistaEditar.fechaNacimiento=artistaInterfaz.fechaNacimiento;
    this.artistaEditar.nacionalidad=artistaInterfaz.nacionalidad;
    this.artistaEditar.nombre=artistaInterfaz.nombre;
   
    this.artistaService.putArtista(this.artistaEditar).subscribe(data=>{
      this._snackBar.open("Artista editado con éxito", "close", { duration: 3000 });
        this.actualizarArtista();

    })
   })
  }

  actualizarArtista(){
    this.artistaInterfaz=[];
    this.artistaService.getListarArtista().subscribe(data =>{
      data.forEach(element=>{
        let artistaInterfaz:ArtistaInterfaz=new ArtistaInterfaz();
        artistaInterfaz.id=element.id;
        artistaInterfaz.nombre=element.nombre;
        artistaInterfaz.nacionalidad=element.nacionalidad;
        artistaInterfaz.fechaNacimiento=element.fechaNacimiento;
        artistaInterfaz.sexo=element.sexo;
        artistaInterfaz.generoMusical=element.generoMusical;
        this.artistaInterfaz.push(artistaInterfaz);
      })
      this.artistaInterfazFiltrados=this.artistaInterfaz.filter(artista=>artista.nombre.toLocaleLowerCase().includes(""))
     });
  }
}

class ArtistaInterfaz{
  
  id!: number;
  nombre!: string;
  fechaNacimiento!: string;
  nacionalidad!: string;
  editable!:boolean;
  sexo!:string;
  generoMusical!:string;
}
