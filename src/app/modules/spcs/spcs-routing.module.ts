import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { LayoutDashComponent } from './pages/common/layout/layout-dash/layout-dash.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiagnosticosComponent } from './pages/diagnosticos/diagnosticos.component';
import { EnfermeirosComponent } from './pages/enfermeiros/enfermeiros.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { RegisterDiagnosticoComponent } from './pages/register-diagnostico/register-diagnostico.component';


const routes: Routes = [  
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        component: LayoutDashComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'diagnosticos',
        component: DiagnosticosComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path: 'diagnosticos/cadastro',
        component: RegisterDiagnosticoComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path:'usuario/register',
        component: RegisterComponent,
        canActivate: [ AuthGuard ],
        pathMatch: 'full'
      },
      {
        path:'pacientes',
        component: PacientesComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path:'medicos/register',
        component: RegisterComponent,
        canActivate: [ AuthGuard ],
        pathMatch: 'full'
      },
      {
        path:'medicos',
        component: MedicosComponent,
        canActivate: [ AuthGuard ]
      },
      {
        path:'enfermeiros/register',
        component: RegisterComponent,
        canActivate: [ AuthGuard ],
        pathMatch: 'full'
      },
      {
        path:'enfermeiros',
        component: EnfermeirosComponent,
        canActivate: [ AuthGuard ]
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
