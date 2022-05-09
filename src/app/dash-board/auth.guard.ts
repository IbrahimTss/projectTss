import { HttpClient } from '@angular/common/http';
// import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { observable, Observable } from 'rxjs';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  [x: string]: any;


  constructor(private http: HttpClient, private router: Router,private api : ApiService) { }
  
  canActivate(): boolean {

    let user = localStorage.getItem('userData') ? true : false
    console.log('user', user)
    if (user) {
      return true
    } else {
      this.router.navigate(['/login'])
      return false
    }



  }

 

}


