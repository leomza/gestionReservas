import { Component } from '@angular/core';
import { SalasService } from 'src/app/Servicio/salas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})
export class SalasComponent {

  data : any;
  rows : any;
  columns : any;

  constructor(private SalaService: SalasService, private ruta: Router) {
    //name: Es el nombre que tendra la columna / prop: Es el nombre del atributo que llega en el JSON:
    this.columns=[{ name: 'Nombre',prop:'nombre' }, { name: 'Descripcion',prop:'descripcion' }]
    
    this.SalaService.mostrarTodas()
    .subscribe(info => {
      this.rows = info;
      console.log(this.rows)
    });
    }
    
  eliminar(id){
    console.log(id)
    this.SalaService.eliminarSala(id).subscribe(data=>{
      console.log("Eliminar",data);
      this.ruta.navigateByUrl("/salas")
    })
}
}
