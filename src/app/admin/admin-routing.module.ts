import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AuthGuard} from '../components/guards/auth.guard'
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'producto',
        loadChildren: () =>
          import('./../../app/producto/list-posts/list-posts.module').then(m => m.ListPostsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
