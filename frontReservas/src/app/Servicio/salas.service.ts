import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  constructor(private http: HttpClient) { }

  mostrarTodas(){
    return this.http.get(environment.comienzoUrl+"salas");
  }
  
  nuevaSala(datos){
    return this.http.post(environment.comienzoUrl+"salas", datos)
  }

  eliminarSala(id){
    return this.http.delete(environment.comienzoUrl+"salas/"+id)
  }
}

