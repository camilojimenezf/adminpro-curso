import { Component, OnInit } from '@angular/core';
import { HospitalService, UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Hospital } from 'src/app/models/hospital.model';

declare var swal:any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  public hospitales:Hospital[]=[];
  public cargando:boolean=true;
  public totalRegistros:number=0;
  public desde: number=0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe(
      response=>{
        this.cargarHospitales(); //Recargamos los datos de la tabla cuando se escuche el evento que emite modal-upload.service, avisando que se actualizo una imagen
      }
    )
  }

  /**
   * función para crear un hospital usando sweetalert
   */
  crearHospital(){
    swal("Ingresa el nombre del Hospital:", {
      content: "input",
    })
    .then((value) => {
      this._hospitalService.crearHospital(value).subscribe(
        response=>{
          if(response){
            swal(`has agregado el hospital: ${value}`);
          }
        }
      );
    });
  }

  /**
   * función para cargar todos los hospitales registrados (con paginamiento)
   */
  cargarHospitales(){
    this.cargando=true;

    this._hospitalService.cargarHospitales(this.desde).subscribe(
      (response:any)=>{
        console.log(response);
        this.totalRegistros=response.total;
        this.hospitales=response.hospitales;
        this.cargando=false;
      }
    );
  }

  /**
   * función para actualizar un hospital
   * @param hospital hospital que se desea actualizar
   */
  guardarHospital(hospital:Hospital){
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }
  /**
   * función para eliminar un hospital
   * @param hospital hospital que se desea eliminar
   */
  borrarHospital(hospital:Hospital){
  
    /*if(hospital.usuario._id != this._usuarioService.usuario._id){
      swal('No puede borrar el hospital','No puede borrar un hospital creado por otro usuario','error');
      return;
    }*/

    swal({
      title:'¿Esta seguro?',
      text:'Esta a punto de borrar a: '+hospital.nombre,
      icon:'warning',
      buttons:true,
      dangerMode:true,
    })
    .then( borrar =>{  //sweetalert retorna un true si se selecciono ok, por ende se ejecuta el then

      if(borrar){
        this._hospitalService.borrarHospital(hospital._id).subscribe(
          (borrado:boolean)=>{
            console.log(borrado);
            this.cargarHospitales();
          });
      }
    
    });
  }
  /**
   * función que trae los hospitales que coincidan con el termino
   * @param termino palabra por la cual se busca el hospital
   */
  buscarHospital(termino:string){
    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }

    this.cargando=true;

    this._hospitalService.buscarHospital(termino).subscribe(
      (hospitales:Hospital[])=>{
        this.hospitales=hospitales;
        this.cargando=false;
      }
    )
  }
  /**
   * función para cambiar el paginamiento de la tabla
   * @param valor para el paginamiento
   */
  cambiarDesde(valor:number=0){
    let desde=this.desde+valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde+=valor;
    this.cargarHospitales();
  }

  /**
   * función para mostrar el modal y poder actualizar la imagen
   * @param id id del hospital 
   */
  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('hospitales',id);
  }

}
