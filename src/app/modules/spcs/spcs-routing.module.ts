import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LayoutDashComponent } from './pages/common/layout/layout-dash/layout-dash.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';


const routes: Routes = [  
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: LayoutDashComponent
      },
      {
        path:'paciente/register',
        component: RegisterComponent,
        pathMatch: 'full'
      },
      {
        path:'pacientes',
        component: PacientesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpcsRoutingModule { }
