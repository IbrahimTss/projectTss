import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss'],
})
export class EditDetailsComponent implements OnInit {
  // id : any;
  public editForm!: FormGroup;
  constructor(
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EditDetailsComponent>,
    private toastr: NotificationService
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(8),
      ]),
    });
    if (this.editData) {
      this.editForm.controls['name'].setValue(this.editData.name);
      this.editForm.controls['email'].setValue(this.editData.email);
      this.editForm.controls['mobile'].setValue(this.editData.mobile);
      this.editForm.controls['password'].setValue(this.editData.password);
    }
  }
  saveForm() {
    if (this.editForm.valid) {
      this.api.editdata(this.editForm.value, this.editData.id).subscribe({
        next: (res) => {
          if (res) {
            this.editForm.valid === true;
            this.toastr.showSuccess(' sucessfully ', 'Updated');
            this.dialogRef.close('updated');
          }
        },
        error: () => {
          this.toastr.showError('Somthing went wrong!', 'Error');
        },
      });
    }
  }
}
