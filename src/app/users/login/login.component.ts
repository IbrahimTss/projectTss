import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private router:Router,private api:ApiService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(8)]),
    });
  }
//  api login 
  login() : void{
    if(this.loginForm.valid){

      this.api.getdata(this.loginForm.value)
      .subscribe ({
        next :(res)=>{
          
          if(res){
            this.loginForm.valid === true
            this.api.showSuccess('','login sucessfully ')
            localStorage.setItem('userData', JSON.stringify(res))
            this.router.navigate(["/navbar"])

          }else{
            // this.toastr.error('Check Your Password')
            this.loginForm.reset();
          }
        },
        error:()=>{
          // this.toastr.error('Somthing went wrong!')
          
        }
        
      })

    }
  }
}
