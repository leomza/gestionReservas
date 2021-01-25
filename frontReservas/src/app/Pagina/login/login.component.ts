import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../Servicio/usuarios.service';
import { Router } from '@angular/router';
import { UsuarioLogin } from 'src/app/Interfaces/usuarios';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup

  constructor(private fb: FormBuilder, private usuarioServ: UsuariosService, private ruta : Router, private _snackBar: MatSnackBar) {
    this.myForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    })
  }

  login() {
    this.usuarioServ.login(this.myForm.get('username').value, this.myForm.get('password').value)
      .subscribe((data: UsuarioLogin) => {
        console.log("Success", data)
        if (data.token) {
          alert("Sesion iniciada con exito")
          //Paso el token y cambio el estado a TRUE (estoy logueado):
          this.usuarioServ.authenticate(data.token);
          this.ruta.navigateByUrl("/");
        } else {
          alert(data["message"]);
        }
      },
        err => {
          console.log("Error", err)
        }
      )
  }
 
  ngOnInit(): void {
  }

}
