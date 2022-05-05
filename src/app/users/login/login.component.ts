import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private router:Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  login() {
    if(this.loginForm.valid){
    console.log(this.loginForm.value);
    const value = localStorage.setItem(
      'token',
      JSON.stringify(this.loginForm.value)
    );
    this.router.navigate(['/navbar'])
    }
  }
}
