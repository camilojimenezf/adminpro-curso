import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal:any;



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuario[]=[];
  public desde: number=0; //variable para manejar la paginación
  public totalRegistros:number=0;
  public cargando:boolean=true;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(
      response=>{
        this.cargarUsuarios(); //Recargamos los datos de la tabla cuando se escuche el evento que emite modal-upload.service, avisando que se actualizo una imagen
      }
    )
  }

  cargarUsuarios(){
    this.cargando=true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe(
      (response:any)=>{
        console.log(response);
        this.totalRegistros=response.total;
        this.usuarios=response.usuarios;
        this.cargando=false;
        
      }
    );

  }

  cambiarDesde(valor:number){
    
    let desde=this.desde+valor;

    if(desde >= this.totalRegistros){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde+=valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino:string){

    console.log(termino);
    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }

    this.cargando=true;

    this._usuarioService.buscarUsuarios(termino).subscribe(
      (usuarios:Usuario[])=>{
        this.usuarios=usuarios;
        this.cargando=false;
      }
    )

  }

  borrarUsuario(usuario: Usuario){

    console.log(usuario);
    if(usuario._id === this._usuarioService.usuario._id){
      swal('No puede borrar usuario','No se puede borrar a si mismo','error');
      return;
    }

    swal({
      title:'¿Esta seguro?',
      text:'Esta a punto de borrar a: '+usuario.nombre,
      icon:'warning',
      buttons:true,
      dangerMode:true,
    })
    .then( borrar =>{  //sweetalert retorna un true si se selecciono ok, por ende se ejecuta el then

      console.log(borrar);
      if(borrar){
        this._usuarioService.borrarUsuario(usuario._id).subscribe(
          (borrado:boolean)=>{
            console.log(borrado);
            this.cargarUsuarios();
          });
      }
    
    });

  }

  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id:string){
    this._modalUploadService.mostrarModal('usuarios',id);
  }

}
