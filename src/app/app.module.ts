import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpcsModule } from './modules/spcs/spcs.module';
import { SharedService } from './services/shared.service';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LibComponentsModule } from './modules/commom/lib-components.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LibComponentsModule,
    SpcsModule
  ],
  providers: [
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
