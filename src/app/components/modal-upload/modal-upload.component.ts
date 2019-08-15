import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { 
    console.log("modal upload");
  }

  ngOnInit() {
  }

  seleccionImagen( archivo:File){
    
    if(!archivo){
      this.imagenSubir=null;
      return;
    }

    if( archivo.type.indexOf('image')<0){
      swal('Sólo Imágenes','El archivo seleccionado no es una imágen','error');
      this.imagenSubir=null;
      return;
    }

    this.imagenSubir=archivo;

    let reader= new FileReader();
    let urlImagenTemp=reader.readAsDataURL(archivo);

    reader.onloadend= ()=> this.imagenTemp = reader.result+"";   //funcion de flecha reader.result corresponse a la imagen en base 64
  }

  cerrarModal(){
    this.imagenSubir=null;
    this.imagenTemp=null;

    this._modalUploadService.ocultarModal();
  }

  subirImagen(){
    
    this._subirArchivoService.subirArchivo(this.imagenSubir,this._modalUploadService.tipo, this._modalUploadService.id)
        .then( response =>{
          console.log(response);
          this._modalUploadService.notificacion.emit(response);
          this.cerrarModal();
        })
        .catch( err=>{
          console.log("Error en la carga...");
        })
  }

}
