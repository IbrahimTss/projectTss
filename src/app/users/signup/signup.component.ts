import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public dataForm!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.dataForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      password: new FormControl(''),
    });
  }
  signup() {
    // localStorage.setItem('token', JSON.stringify(this.dataForm.value));
    console.log(this.dataForm.value);
    this.router.navigate(['login']);
    this.dataForm.reset();
  }
}
