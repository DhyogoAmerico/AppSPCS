import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const appRoutes: Routes = [
  // { 
  //   path: '', 
  //   pathMatch: 'full',
  //   redirectTo: '/login'
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./modules/commom/commom.module').then(m => m.CommomModule) 
  // },
  {
    path: '**',
    component: NotFoundComponent
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
