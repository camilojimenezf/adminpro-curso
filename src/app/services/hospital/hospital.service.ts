import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Hospital } from 'src/app/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    public http: HttpClient,
    public _usuarioService:UsuarioService
  ) { }

  /**
   * función que retorna todos los hospitales registrados en BDD
   */
  cargarHospitales(desde:number=0){
    
    let url= URL_SERVICIOS+'/hospital?desde='+desde;
    return this.http.get(url);

  }
  /**
   * retorna un hospital especificado por id
   * @param id corresponde al id del hospital
   */
  obtenerHospital(id:string){
    
    let url=URL_SERVICIOS+'/hospital/'+id;
    return this.http.get(url).pipe(
      map((response:any)=>response.hospital)
    );

  }
  /**
   * elimina un hospital
   * @param id corresponse al id del hospital
   */
  borrarHospital(id:string){

    let url=URL_SERVICIOS+'/hospital/'+id;
    url+='?token='+this._usuarioService.token;

    return this.http.delete(url).pipe(
      map((response:any)=>{
        swal('Hospital borrado',`El hospital ${response.hospital.nombre} a sido eliminado correctamente`,'success');
        return true;
      })
    );
  }
  /**
   * función para crear un nuevo hospital
   * @param nombre nombre del hospital que se creara
   */
  crearHospital(nombre: string){

    let url=URL_SERVICIOS+'/hospital';
    url+='?token='+this._usuarioService.token;
    let hospital:Hospital=new Hospital(nombre);

    return this.http.post(url, hospital).pipe(
        map((resp:any)=>{
          swal('Hospital creado!',resp.hospital.nombre,'success');
          return resp.hospital;
        })
    );
  }
  /**
   * retorna un hospital que coincida con el termino 
   * @param termino palabra por la cual se hara la busqueda de hospital
   */
  buscarHospital(termino:string){
    let url=URL_SERVICIOS+'/busqueda/coleccion/hospitales/'+termino;
    return this.http.get(url).pipe(
      map((response:any)=>{
        return response.hospitales;
      })
    );
  }
  /**
   * esta función actualiza un hospital existente
   * @param hospital hospital con los datos para actualizar
   */
  actualizarHospital(hospital: Hospital){

    let url=URL_SERVICIOS+'/hospital/'+hospital._id;
    url+='?token='+this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map((response:any)=>{
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }

}
