import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public dataForm!: FormGroup;
  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: NotificationService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.pattern('^[a-z-A-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      mobile: new FormControl('', [Validators.required]),
      password: new FormControl('',[Validators.required,Validators.minLength(5),
        Validators.maxLength(8),Validators.pattern('^(?=.*[a-z-A-Z])(?=.*[A-Z-a-z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
    });
  }
  //  signup data

  signup(): void {
    if (this.dataForm.valid) {
      this.api.putdata(this.dataForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.dataForm.valid === true;
            this.toastr.showSuccess(' sucessfully ', 'Signup');
            this.router.navigate(['/login']);
          } else {
            this.toastr.showError('Check Your Password', 'Invalid');
            this.dataForm.reset();
          }
        },
        error: () => {
          this.toastr.showError('Somthing went wrong!', 'Error');
        },
      });
    }
  }
}
