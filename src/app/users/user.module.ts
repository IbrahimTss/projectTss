import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { UserRoutingModule } from './user-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

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
      BrowserAnimationsModule,
      MatFormFieldModule,
      MatDialogModule,
      MatInputModule,
      MatCardModule,
      FlexLayoutModule,
      MatToolbarModule,
      MatButtonModule,
      ReactiveFormsModule,
    ],
    providers: [],
  })
  export class UserModule { }
  
