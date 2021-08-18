import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {GrowlModule} from 'primeng/components/growl/growl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpcsModule } from './modules/spcs/spcs.module';
import { SharedService } from './services/shared.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonLoginComponent } from './components/common-login/common-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    CommonLoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    SidebarModule,
    BrowserAnimationsModule,
    MessagesModule,
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
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
