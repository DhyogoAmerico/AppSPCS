import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/components/growl/growl';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpcsModule } from './modules/spcs/spcs.module';
import { SharedService } from './services/shared.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonLoginComponent } from './components/common-login/common-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Interceptor } from './services/common-service/interceptor';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastService } from './services/common-service/toast.service';
import { NgxMaskModule } from 'ngx-mask';
import { CookieService } from 'ngx-cookie-service';
import { AddAddressComponent } from './components/add-address/add-address.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    CommonLoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SidebarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    BrowserAnimationsModule,
    MessagesModule,
    NgxMaskModule.forRoot({
      validation: true,
    }),
    MessageModule,
    ToastModule,
    GrowlModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SpcsModule
  ],
  providers: [
    MessageService,
    ToastService,
    CookieService,
    SharedService,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
