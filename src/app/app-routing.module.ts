import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RefreshTokenGuard } from './services/refresh-token.guard';


const appRoutes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ RefreshTokenGuard ]
  },
  {
    path: '404',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules , initialNavigation: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
