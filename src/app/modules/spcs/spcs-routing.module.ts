import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';
import { TypeUserGuard } from 'src/app/services/type-user.guard';
import { RegisterComponent } from './components/register/register.component';
import { AgrotoxicosComponent } from './pages/agrotoxicos/agrotoxicos.component';
import { LayoutDashComponent } from './pages/common/layout/layout-dash/layout-dash.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DiagnosticosComponent } from './pages/diagnosticos/diagnosticos.component';
import { EnfermeirosComponent } from './pages/enfermeiros/enfermeiros.component';
import { ExportDataComponent } from './pages/export-data/export-data.component';
import { FichaComponent } from './pages/ficha/ficha.component';
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
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['*'] }
      },
      {
        path: 'diagnosticos',
        component: DiagnosticosComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['medico','admin']}
      },
      {
        path: 'fichas',
        component: FichaComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['*'] }
      },
      {
        path: 'agrotoxicos',
        component: AgrotoxicosComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['*'] }
      },
      {
        path: 'diagnosticos/cadastro/:cpf',
        component: RegisterDiagnosticoComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['*'] }
      },
      {
        path:'usuario/register/:type',
        component: RegisterComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        pathMatch: 'full',
        data: { typeUser: ['*'] }
      },
      {
        path:'pacientes',
        component: PacientesComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['*'] }
      },
      {
        path:'medicos/register',
        component: RegisterComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        pathMatch: 'full',
        data: { typeUser: ['admin'] }
      },
      {
        path:'medicos',
        component: MedicosComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['admin'] }
      },
      {
        path:'enfermeiros/register',
        component: RegisterComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        pathMatch: 'full',
        data: { typeUser: ['medico','admin'] }
      },
      {
        path:'enfermeiros',
        component: EnfermeirosComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['medico','admin'] }
      },
      {
        path: 'export',
        component: ExportDataComponent,
        canActivate: [ AuthGuard, TypeUserGuard ],
        data: { typeUser: ['admin'] }
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
