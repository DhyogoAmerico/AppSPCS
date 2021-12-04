import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import {MessagesModule} from 'primeng/messages';
import { DialogModule } from 'primeng/components/dialog/dialog';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputSwitch, InputSwitchModule} from 'primeng/inputswitch';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {RadioButtonModule} from 'primeng/radiobutton'
import {CheckboxModule} from 'primeng/checkbox';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DropdownModule} from 'primeng/dropdown';

import { SpcsRoutingModule } from './spcs-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MessageService } from 'primeng/components/common/messageservice';
import { LayoutDashComponent } from './pages/common/layout/layout-dash/layout-dash.component';
import { MedicoDashComponent } from './pages/common/dashboard/medico/medico-dash/medico-dash.component';
import { EnfermeiroDashComponent } from './pages/common/dashboard/enfermeiro/enfermeiro-dash/enfermeiro-dash.component';
import { AdminDashComponent } from './pages/common/dashboard/admin/admin-dash/admin-dash.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DashInformationsComponent } from './components/dash-informations/dash-informations.component';
import { PacientesComponent } from './pages/pacientes/pacientes.component';
import { AddAddressComponent } from 'src/app/components/add-address/add-address.component';
import { BaseComponent } from 'src/app/services/common-service/base-component/base-component.component';
import { EnfermeirosComponent } from './pages/enfermeiros/enfermeiros.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { DiagnosticosComponent } from './pages/diagnosticos/diagnosticos.component';
import { RegisterDiagnosticoComponent } from './pages/register-diagnostico/register-diagnostico.component';
import { StepsComponent } from 'src/app/components/steps-component/steps-component.component';
import { FichaComponent } from './pages/ficha/ficha.component';
import { AgrotoxicosComponent } from './pages/agrotoxicos/agrotoxicos.component';
import { RegisterAgrotoxicoComponent } from './components/register-agrotoxico/register-agrotoxico.component';
import { ExportDataComponent } from './pages/export-data/export-data.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SideNavComponent, 
    LayoutDashComponent, 
    MedicoDashComponent, 
    EnfermeiroDashComponent, 
    AdminDashComponent, 
    RegisterComponent, 
    DashInformationsComponent, 
    AddAddressComponent,
    BaseComponent,
    PacientesComponent,
    EnfermeirosComponent,
    MedicosComponent,
    StepsComponent,
    DiagnosticosComponent,
    RegisterDiagnosticoComponent,
    FichaComponent,
    AgrotoxicosComponent,
    RegisterAgrotoxicoComponent,
    ExportDataComponent,
    LoadingComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    TableModule,
    RadioButtonModule,
    InputSwitchModule,
    CheckboxModule,
    MultiSelectModule,
    TooltipModule,
    ProgressSpinnerModule,
    OverlayPanelModule,
    KeyFilterModule,
    DropdownModule,
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
