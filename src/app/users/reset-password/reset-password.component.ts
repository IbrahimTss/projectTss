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
// export class ResetPasswordComponent implements OnInit {
//   public newpass!: FormGroup;
//   editData: any;
//   constructor(
//     private api: ApiService,
//     private toastr: NotificationService,
//     private route: Router
//   ) {}

//   ngOnInit(): void {
//     this.newpass = new FormGroup({
//       new_password: new FormControl('', [
//         Validators.required,
//         Validators.minLength(5),
//         Validators.maxLength(8),
//       ]),
//       confirm_password: new FormControl('', [
//         Validators.required,
//         Validators.minLength(5),
//         Validators.maxLength(8),
//       ]),
//     });
//     if (this.editData) {
//       this.newpass.controls['password'].setValue(this.editData.new_password);
//       this.newpass.controls['cnfrmpassword'].setValue(
//         this.editData.confirm_password
//       );
//     }
//   }
//   signup() {
//     if (this.newpass.valid) {
//       this.api
//         .editdata(this.newpass.value, this.editData.id.password)
//         .subscribe({
//           next: (res) => {
//             if (res) {
//               this.newpass.valid === true;
//               this.toastr.showSuccess(' sucessfully ', 'Updated');
//               this.route.navigate(['/login']);
//             }
//           },
//           error: () => {
//             this.toastr.showError('Somthing went wrong!', 'Error');
//           },
//         });
//     }
//   }
// }
export class ResetPasswordComponent implements OnInit, OnDestroy {
  userId: any;
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
      this.userId = params['userId'];
    });
    this.resetForm = this.formBuilder.group(
      {
        new_password: ['', [Validators.required, Validators.minLength(6)]],
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

  get f() {
    return this.resetForm.controls;
  }

  async onSubmit() {
    if (!this.resetForm.valid) {
      this.resetForm.markAllAsTouched();
      return;
    }
    let form = this.resetForm.value;
    let params = {
      id: this.userId,
      password: form.password,
      confirm_password: form.confirm_password,
    };
    this.api.resetPassword(params).subscribe(
      (resp: any) => {
        if (resp) {
          console.log(resp);

          this.toastr.showSuccess(resp.message);
          this.router.navigate(['/login']);
        }
      },
      async (error: any) => {
        this.toastr.showError(error.message);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
