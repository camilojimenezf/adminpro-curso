import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos:number=0;

  constructor(
    public http: HttpClient,
    public _usuarioService:UsuarioService
  ) { }

  cargarMedicos(desde:number=0){

    let url= URL_SERVICIOS+'/medico?desde='+desde;

    return this.http.get(url).pipe(
      map((response:any)=>{
        this.totalMedicos=response.total;
        console.log(response.medicos);
        return response.medicos;
      })
    );
  }

  cargarMedico(id: string){
    
    let url=URL_SERVICIOS+'/medico/'+id;
    return this.http.get(url).pipe(
      map((response:any)=>response.medico)
    );
  }

  guardarMedico(medico:Medico){
    
    let url=URL_SERVICIOS+'/medico';

    if(medico._id){
      //actualizando
      url+='/'+medico._id;
      url+='?token='+this._usuarioService.token;

      return this.http.put(url, medico).pipe(
        map((response:any)=>{
          swal('Médico Actualizado',medico.nombre,'success');
          return response.medico;
        })
      )
    }else{
      //creando
      url+='?token='+this._usuarioService.token;
  
      return this.http.post(url, medico).pipe(
        map((response:any)=>{
          swal('Médico Creado',medico.nombre,'success');
          return response.medico;
        })
      );
    }
    

  }

  buscarMedicos(termino:string){
    
    let url=URL_SERVICIOS+'/busqueda/coleccion/medicos/'+termino;
    return this.http.get(url).pipe(
      map((response:any)=>{
        return response.medicos;
      })
    );
  }

  borrarMedico(id:string){

    let url=URL_SERVICIOS+'/medico/'+id;
    url+='?token='+this._usuarioService.token;

    return this.http.delete(url).pipe(
      map(response=>{
        swal('Médico borrado','Médico borrado correctamente','success');
        return response;
      })
    );
  }
}
