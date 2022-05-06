import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      // {
      //   path: 'otp-verify',
      //   component: OTPVerifyComponent,
      // },
      // {
      //   path: 'reset-password',
      //   component: ResetPassComponent,
      // },
      // {
      //   path: 'age-verify',
      //   component: AgeVerifyComponent,
      // },
      // {
      //   path: 'age-verify-fail',
      //   component: AgeVerifyFailComponent,
      // },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
