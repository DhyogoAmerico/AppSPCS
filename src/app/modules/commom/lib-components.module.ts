import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibComponentsRoutingModule } from './lib-components-routing.module';
import { LoginComponent } from './page/login/login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  providers: [
    LibComponentsRoutingModule
  ]
})
export class LibComponentsModule { }
