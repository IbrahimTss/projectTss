import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
    declarations: [
      SignupComponent,
      LoginComponent,
      ForgotPasswordComponent,
      ResetPasswordComponent
    ],
    imports: [
      BrowserModule,
      UserRoutingModule,
      BrowserAnimationsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class UserModule { }
  