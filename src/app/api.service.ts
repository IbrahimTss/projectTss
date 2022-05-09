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
  showSuccess(arg0: string, arg1: string) {
    throw new Error('Method not implemented.');
  }
  login() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private router: Router) {}

  putdata(data: any) {
    return this.http.post<any>('http://192.168.0.121:3350/signapi', data);
  }

  getAlldata() {
    return this.http.get<any>('http://192.168.0.121:3350/signapi');
  }

  getdata(data: any) {
    return this.http.get<any>('http://192.168.0.121:3350/signapi').pipe(
      map((resp: any) => {
        return resp.find(
          (i: any) => i.email === data.email && i.password === data.password
        );
      })
    );
  }

  editdata(data: any, id: number) {
    return this.http.put<any>('http://192.168.0.121:3350/signapi/' + id, data);
  }

  deleteproduct(id: number) {
    return this.http.delete<any>('http://192.168.0.121:3350/signapi/' + id);
  }

  // showSuccess(message : string, title : string) {
  //   this.toastr.success(message,title);
  // }
}
