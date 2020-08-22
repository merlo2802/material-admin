import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routesSeguridad: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routesSeguridad)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
