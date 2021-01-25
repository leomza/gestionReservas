import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalasService } from 'src/app/Servicio/salas.service';

@Component({
  selector: 'app-nueva-sala',
  templateUrl: './nueva-sala.component.html',
  styleUrls: ['./nueva-sala.component.css']
})
export class NuevaSalaComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private ruta: Router, private salaServ: SalasService) {
    this.myForm = this.fb.group({
      nombre: ["",[Validators.required]],
      descripcion: [""],
    })
  }

  crearSala() {
    console.log(this.myForm.value)
    this.salaServ.nuevaSala(this.myForm.value)
      .subscribe(data => {
        console.log("Data", data)
        if (data) {
          alert("Sala creada con exito");
          this.ruta.navigateByUrl("/salas");
        } else {
          alert(data["message"]);
        }
      },
        err => {
          console.log("Ocurrio un error", err)
          alert(err.error.mensaje)
        })
  }
  ngOnInit(): void {
  }

}
