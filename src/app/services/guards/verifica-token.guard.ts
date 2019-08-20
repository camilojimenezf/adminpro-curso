import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){

  }

  canActivate(): Promise<boolean> | boolean {

    let token= this._usuarioService.token;
    let payload=JSON.parse(atob(token.split('.')[1]));

    let expirado=this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }

    console.log(payload);

    console.log('Token guard');
    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp:number):Promise<boolean>{
    return new Promise((resolve,reject)=>{

      let tokenExp= new Date(fechaExp*1000);
      let ahora= new Date();

      ahora.setTime(ahora.getTime()+ 4*60*60*1000); //toma la fecha actual y le suma 4 horas

      if( tokenExp.getTime() > ahora.getTime() ){   //compara la fecha de expiracion del token con la fecha denifica en 4 horas mas tarde (esto podemos personalizarlo como estimemos conveniente)
        resolve(true); //no renueva el token, solo devuelve un true
      }else{
        this._usuarioService.renuevaToken().subscribe(
          ()=>{
            resolve(true);
          },
          ()=>{
            this.router.navigate(['/login']);
            reject(false); //si retorna reject impedira que el guard le conceda acceso al usuario
          }
        );
      }

      resolve(true);
    })
  }

  expirado(fechaExp:number){
    
    let ahora = new Date().getTime() / 1000;

    if(fechaExp < ahora){
      return true;
    }else{
      return false;
    }
  }
  
}
