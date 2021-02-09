import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component'

import { ItemComponent } from './components/item/item.component';
import { AboutComponent } from './../app/components/about/about.component';
import { ContainerAppComponent } from './components/container-app/container-app.component';

//Buscardor Home
import { SearchComponent } from '../app/components/search/search.component';


const routes: Routes = [
  {
    path: '',
    component: ContainerAppComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./components/home/home.module').then(m => m.HomeModule)
      },

      { path: 'search/:termino', component: SearchComponent },
      { path: 'item/:id', component: ItemComponent },
     // { path: 'about', component: AboutComponent },
      {
        path: 'about',
        loadChildren: () =>
          import('./components/about/about.module').then(
            m => m.AboutModule
          )
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then(m => m.LoginModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
