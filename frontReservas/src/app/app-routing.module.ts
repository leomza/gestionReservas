import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalasComponent } from 'src/app/Pagina/salas/salas.component'
import { ReservasComponent } from 'src/app/Pagina/reservas/reservas.component'
import { NuevaSalaComponent } from 'src/app/Pagina/salas/nueva-sala/nueva-sala.component'
import { NuevaReservaComponent } from 'src/app/Pagina/reservas/nueva-reserva/nueva-reserva.component'
import { LoginComponent } from 'src/app/Pagina/login/login.component'

const routes: Routes = [
  { path: 'salas', component: SalasComponent },
  { path: 'reservas', component: ReservasComponent },
  { path: 'salas/nuevaSala', component: NuevaSalaComponent },
  { path: 'reservas/nuevaReserva', component: NuevaReservaComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
