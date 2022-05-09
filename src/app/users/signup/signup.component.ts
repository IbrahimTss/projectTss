import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

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
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required,Validators.minLength(10)]),
      password: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(8)]),
    });
  }
  //  signup data

  signup(): void {
    if (this.dataForm.valid) {
      this.api.putdata(this.dataForm.value).subscribe({
        next: (res) => {
          if (res) {
            this.dataForm.valid === true;
            // this.api.showSuccess('','login sucessfully ')
            // localStorage.setItem('userData', JSON.stringify(res))
            this.router.navigate(['/login']);
          } else {
            // this.toastr.error('Check Your Password')
            this.dataForm.reset();
          }
        },
        // error:()=>{
        //   this.toastr.error('Somthing went wrong!')

        // }
      });
    }
  }
}
