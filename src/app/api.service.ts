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
    return this.http.post('/users/forgot_password', data).pipe(
      map((resp: any) => {
        // console.log('forgotRtes', resp, parseResponse(resp));
        return parseResponse(resp);
      })
    );
  }

  // reset password

  // resetdata(data: any, id: number) {
  //   return this.http.post<any>('/users/reset_password' + id, data);
  // }

  resetPassword(params: any) {
    return this.http.post('/users/reset_password', params).pipe(
      map((resp) => {
        return parseResponse(resp);
      })
    );
  }
}

// toastr notification 
export function parseResponse(resp: any): ResponseInterface {
  let error = resp.error || {};

  let response: ResponseInterface = {
    status: true,
    message: error.message || '',
    data: resp.data || null,
  };

  if (resp.token) {
    response.token = resp.token;
  }

  if (error.code && error.code != '0') {
    response.status = false;
  }

  return response;
}

export interface ResponseInterface {
  status?: boolean;
  message?: string;
  data?: any;
  token?: string;
}
