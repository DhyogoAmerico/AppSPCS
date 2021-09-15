import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import {MessagesModule} from 'primeng/messages';
import { DialogModule } from 'primeng/components/dialog/dialog';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';

import { SpcsRoutingModule } from './spcs-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { LayoutDashComponent } from './pages/common/layout/layout-dash/layout-dash.component';
import { MedicoDashComponent } from './pages/common/dashboard/medico/medico-dash/medico-dash.component';
import { EnfermeiroDashComponent } from './pages/common/dashboard/enfermeiro/enfermeiro-dash/enfermeiro-dash.component';
import { AdminDashComponent } from './pages/common/dashboard/admin/admin-dash/admin-dash.component';
import { RegisterComponent } from './components/register/register.component';
import { ToastService } from 'src/app/services/common-service/toast.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DashInformationsComponent } from './components/dash-informations/dash-informations.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';


@NgModule({
  declarations: [
    DashboardComponent,    
    SideNavComponent, 
    LayoutDashComponent, 
    MedicoDashComponent, 
    EnfermeiroDashComponent, 
    AdminDashComponent, 
    RegisterComponent, 
    DashInformationsComponent, PacientesComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
    ButtonModule,
    ToastModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    SpcsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService
  ]
})
export class SpcsModule { }
