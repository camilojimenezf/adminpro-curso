import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public medicos:Medico[]=[];
  public desde:number=0;
  public cargando:boolean=true;

  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando=true;
    this._medicoService.cargarMedicos(this.desde).subscribe( 
      medicos => {
        this.medicos = medicos;
        this.cargando=false;
      });
  }

  cambiarDesde(valor:number=0){
    let desde=this.desde+valor;

    if(desde >= this._medicoService.totalMedicos){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde+=valor;
    this.cargarMedicos();
  }

  buscarMedico( termino : string ){

    if(termino.length <= 0){
      this.cargarMedicos();
      return;
    }

    this.cargando=true;
    
    this._medicoService.buscarMedicos(termino).subscribe(
      medicos => {
        this.medicos=medicos;
        this.cargando=false;
      });

  }

  borrarMedico(medico:Medico){

    this._medicoService.borrarMedico(medico._id).subscribe(()=>this.cargarMedicos());
  }

}
