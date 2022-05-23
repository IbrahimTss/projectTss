import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
  userId: any;
  userEmail: any;
  error: string | undefined;
  isLoading: boolean | undefined;
  public resetForm!: FormGroup;
  // public newpass! : FormGroup;

  private sub = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private toastr: NotificationService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.userEmail = params['email'];
      console.log('userEmail', this.userEmail)
    });
    if(!this.userEmail){
     return
    }

    this.resetForm = this.formBuilder.group(
      {
        new_password: new FormControl('',[Validators.required,Validators.minLength(5),
          Validators.maxLength(8),Validators.pattern('^(?=.*[a-z-A-Z])(?=.*[A-Z-a-z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
        confirm_password: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const password = group.get('new_password');
    const confirmpassword = group.get('confirm_password');

    if (password.value != confirmpassword.value) {
      // confirmPassword.setErrors(null);
      // } else {
      confirmpassword.setErrors({ ...confirmpassword.errors, notSame: true });
    }
  }


  async onSubmit() {
    if (!this.resetForm.valid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    let form = this.resetForm.value;
    let params = {
      email: this.userEmail,
      new_password: form.new_password,
      confirm_password: form.confirm_password,
    };
    console.log(params)
  
    this.api.resetPassword(params).subscribe(
      (resp: any) => {
        if (resp) {
          console.log(resp);
          this.toastr.showSuccess(resp.message);
          this.router.navigate(['/login']);
        }
      },
      async (error: any) => {
        this.resetForm.reset();
        this.toastr.showError(error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

