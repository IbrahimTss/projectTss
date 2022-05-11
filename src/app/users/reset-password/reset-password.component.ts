import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public newpass!: FormGroup;
  editData: any;
  constructor(
    private api: ApiService,
    private toastr: NotificationService,
    private route : Router
  ) {}

  ngOnInit(): void {
    this.newpass = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8),
      ]),
      cnfrmpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8),
      ]),
    });
    if (this.editData) {
      this.newpass.controls['password'].setValue(this.editData.password);
      this.newpass.controls['cnfrmpassword'].setValue(this.editData.cnfrmpassword);
    }
  }
  signup() {
    if (this.newpass.valid) {
      this.api.editdata(this.newpass.value, this.editData.id.password).subscribe({
        next: (res) => {
          if (res) {
            this.newpass.valid === true;
            this.toastr.showSuccess(' sucessfully ', 'Updated');
            this.route.navigate(['/login'])
          }
        },
        error: () => {
          this.toastr.showError('Somthing went wrong!', 'Error');
        },
      });
    }
  }


}
