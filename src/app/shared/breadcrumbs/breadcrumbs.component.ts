import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo:string;

  constructor(private router:Router,
              private title:Title,
              private meta:Meta    
    ) { 
    
    this.getDataRoute().subscribe(data=>{
      //console.log(data);
      this.titulo=data.titulo;
      this.title.setTitle(this.titulo);

      //construir un Metatag
      //el Metatag podría incluir muchas mas especificaciones, para ello podemos agregar mas data a la url 
      //así obtenerla y asignarla de la misma manera que se asigna el titulo de la pagina 
      const metaTag:MetaDefinition={
          name:'Description',
          content:this.titulo
      };
      //actualiza el tag que fue creado y asi se inserta en el header del HTML
      this.meta.updateTag(metaTag);

    });

  }

  ngOnInit() {
  }

  getDataRoute(){
    //events devuelve todos los eventos relacionados a la ruta
    return this.router.events.pipe(
      //para nuestro proposito solo nos interesa un evento que sea instancia de ActivationEnd
      filter(evento=>evento instanceof ActivationEnd),
      //en events existen 2 objetos instancia de ActivationEnd, para obtener el que necesitamos aplicamos lo siguiente:
      // (podría diferenciarse de otra manera) 
      filter((evento:ActivationEnd)=>evento.snapshot.firstChild===null),
      //ahora solo obtenemos del objeto el atributo que nos interesa
      map((evento:ActivationEnd)=>evento.snapshot.data),
    )
  }

}
