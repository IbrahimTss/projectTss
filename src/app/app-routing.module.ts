import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './dash-board/navbar/navbar.component';
import { UserDetailComponent } from './dash-board/user-detail/user-detail.component';
import { AuthGuard } from './dash-board/auth.guard';
import { EditDetailsComponent } from './dash-board/edit-details/edit-details.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'users',
    loadChildren: () => import('./users/user.module').then((m) => m.UserModule),
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'userdetail',
    component: UserDetailComponent,
  },
  {
    path: 'editdetail',
    component: EditDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
