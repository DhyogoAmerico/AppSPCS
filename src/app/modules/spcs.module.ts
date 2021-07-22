import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpcsRoutingModule } from './spcs-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    SpcsRoutingModule
  ]
})
export class SpcsModule { }
