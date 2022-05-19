import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
// import { APIResponse, Game } from '../modules/modules.module';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) {}

// signup data 
  insertdata(data: any) {
    return this.http.post<any>('/users/register', data);
  }

// get data 

  getAlldata() {
    return this.http.get<any>('/users');
  }

// get data verification 

  // getdata(data: any) {
  //   return this.http.get<any>('/users/login').pipe(
  //     map((resp: any) => {
  //       return resp.find(
  //         (i: any) => i.email === data.email && i.password === data.password
  //       );
  //     })
  //   );
  // }

  // login data 
  getdata(data: any) {
    return this.http.post<any>('/users/login', data);
  }

// edit data 
  editdata(data: any, id: number) {
    return this.http.put<any>('/users/' + id, data);
  }

  // delete data 

  deleteproduct(id: number) {
    return this.http.delete<any>('/users/' + id);
  }

  // forgot password 

  frgtdata(data: any) {
    return this.http.post<any>('/users/forgot_password',data)
    // .pipe(
    //   map((resp: any) => {
    //     return resp.find(
    //       (i: any) => i.email === data.email
    //     );
    //   })
    // );
  }

  // reset password 

  resetdata(data: any, id: number) {
    return this.http.post<any>('/users/reset_password' + id, data);
  }
}
