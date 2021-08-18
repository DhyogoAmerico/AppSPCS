import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {SidebarModule} from 'primeng/sidebar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { SpcsRoutingModule } from './spcs-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MessageService } from 'primeng/components/common/messageservice';


@NgModule({
  declarations: [
    DashboardComponent,    
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    SpcsRoutingModule
  ],
  providers: [
    MessageService
  ]
})
export class SpcsModule { }
