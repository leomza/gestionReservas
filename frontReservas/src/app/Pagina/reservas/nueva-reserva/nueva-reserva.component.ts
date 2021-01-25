import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/Servicio/reservas.service';
import { SalasService } from 'src/app/Servicio/salas.service';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  myForm: FormGroup;
  salas=<any>[];
  
  constructor(private fb: FormBuilder, private ruta: Router, private reservaServ: ReservasService, private salaServ: SalasService) {
    this.myForm = this.fb.group({
      descripcion: ["", Validators.required],
      turno: ["", Validators.required],
      fechaReunion: ["", Validators.required],
      sala: ["", Validators.required],
      persona: this.fb.group({
        nombre: ["", Validators.required],
        dni: ["", Validators.required],
        email: ["", Validators.required],
        telefono: ["", Validators.required],
    })
  })
  

  //Para mostrar todas las salas en el "Select" del HTML
  this.salaServ.mostrarTodas()
    .subscribe(data =>{
      this.salas = data;
    }) 
  }

  crearReserva() {
    console.log(this.myForm.value)
    this.reservaServ.nuevaReserva(this.myForm.value)
      .subscribe(data => {
        console.log("Data", data)
        if (data) {
          alert("Reserva creada con exito");
          this.ruta.navigateByUrl("/reservas");
        } else {
          alert(data["message"]);
        }
      },
        err => {
          console.log("Ocurrio un error", err)
          alert(err.error.mensaje)
        })
  }

  //Para que no se puede elegir Sabados, Domingos ni dia anterior a hoy cuando selecciono fechas:
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay(); 
    const fechaHoy = new Date();
    return day !== 0 && day !== 6 && d.getTime() >= fechaHoy.getTime();
  }

  ngOnInit(): void {
  }

}
