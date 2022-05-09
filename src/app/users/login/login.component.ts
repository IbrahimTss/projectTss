import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private router: Router,
    private api: ApiService,
    private toastr: NotificationService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8),
      ]),
    });
  }
  //  api login
  login(): void {
    if (this.loginForm.valid) {
      this.api.getdata(this.loginForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.loginForm.valid === true;
            this.toastr.showSuccess(' sucessfully ', 'Login');
            localStorage.setItem('userData', JSON.stringify(res));
            this.router.navigate(['/navbar']);
          } else {
            this.toastr.showError('Check Your Email & Password', 'Invalid');
            this.loginForm.reset();
          }
        },
        error: () => {
          this.toastr.showError('Somthing went wrong!', 'Error');
        },
      });
    }
  }
}
