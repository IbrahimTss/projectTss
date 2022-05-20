import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public forgotpass!: FormGroup;
  constructor(
    private router: Router,
    private api: ApiService,
    private toastr: NotificationService
  ) {}

  ngOnInit(): void {
    this.forgotpass = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  //  forgot api
  forgt(): void {
    if (this.forgotpass.valid) {
      this.api.frgtdata(this.forgotpass.value).subscribe(
        (res) => {
          if (res) {
            this.forgotpass.valid === true;
            this.toastr.showSuccess(res.message);
            this.router.navigate(['/reset-password'], {
              queryParams: {
                email: this.forgotpass.value.email,
              },
            });
          }
        },
        (error: any) => {
          this.toastr.showError(error.message);
          this.forgotpass.reset();
        }
      );
    }
  }
}
