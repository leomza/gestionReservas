import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  mostrarTodas(){
    return this.http.get(environment.comienzoUrl+"reservas");
  }

  nuevaReserva(datos){
    return this.http.post(environment.comienzoUrl+"reservas", datos)
  }

  eliminarReserva(id){
    return this.http.delete(environment.comienzoUrl+"reservas/"+id)
  }
}

