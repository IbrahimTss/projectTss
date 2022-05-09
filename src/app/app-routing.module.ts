import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './dash-board/navbar/navbar.component';
import { UserDetailComponent } from './dash-board/user-detail/user-detail.component';
import { AuthGuard } from './dash-board/auth.guard';

const routes: Routes = [
  { path: "users",  loadChildren: () =>
  import('./users/user.module').then((m) => m.UserModule), },
  {
    path: 'navbar',
    component :NavbarComponent,
    canActivate:[AuthGuard] 
    
  },
  {
    path : 'userdetail',
    component : UserDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
