import { Component } from '@angular/core';
import { ReservasService } from 'src/app/Servicio/reservas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {

  rows;

  constructor(private reservaService: ReservasService, private ruta : Router) {
    this.reservaService.mostrarTodas()
    .subscribe(info => {
      this.rows = info;
    });
  }
  
  eliminar(id: string){
    this.reservaService.eliminarReserva(id).subscribe(data=>{
      console.log("Eliminar",data);
      this.ruta.navigateByUrl('/reservas')
    })
}
}