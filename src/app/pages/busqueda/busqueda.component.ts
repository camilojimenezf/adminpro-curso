import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[]=[];
  public medicos:Medico[]=[];
  public hospitales:Hospital[]=[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params.subscribe(
      params=>{
        let termino=params['termino'];
        this.buscar(termino);
      }
    )
  }

  ngOnInit() {
  }

  buscar( termino:string ){

    let url=URL_SERVICIOS+'/busqueda/todo/'+termino;
    this.http.get(url).subscribe(
      (response:any)=>{
        console.log(response);
        this.hospitales=response.hospitales;
        this.usuarios=response.usuarios;
        this.medicos=response.medicos;
      }
    )
  }

}
