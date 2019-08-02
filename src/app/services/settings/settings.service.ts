import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes:Ajustes={
    temaUrl:"assets/css/colors/default.css",
    tema:"default"
  }

  constructor(
    @Inject(DOCUMENT) private _document,
  ) {
    //con solo inyectar el servicio en otro componente se dispara el constructor
    this.cargarAjustes();
  }

  guardarAjustes(){
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes=JSON.parse(localStorage.getItem('ajustes'));
      //esta funcion se invoca desde app.component por lo que se debe aplicar el tema que esta guardado en localStorage
      this.aplicarTema(this.ajustes.tema);
    }else{
      this.aplicarTema(this.ajustes.tema);
    }
  }

  aplicarTema(tema:string){
    let url=`assets/css/colors/${tema}.css`
    this._document.getElementById('tema').setAttribute('href',url);

    this.ajustes.temaUrl=url;
    this.ajustes.tema=tema;

    this.guardarAjustes();
  }
}

interface Ajustes{
  temaUrl:string;
  tema:string;
}
