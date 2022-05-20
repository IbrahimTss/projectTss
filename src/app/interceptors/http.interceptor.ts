import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { takeUntil, timeout, map, catchError, switchMap } from 'rxjs/operators';
// import { parseResponse } from './../helpers';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { parseResponse } from '../api.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private baseURL = environment.baseURL;

  private jwtToken: any;
  private openURLs: Array<string> = ['/users/register', '/forgot_password'];
  private defaultTimeout: number = 10;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('testintercept');

    if (this.openURLs.indexOf(req.url) > -1) {
      this.jwtToken = undefined;
    }

    let skipLoader = false;
    if (!req.headers.has('skipLoader')) {
      // this.spinner.show();
    } else {
      skipLoader = true;
      req = req.clone({
        headers: req.headers.delete('skipLoader'),
      });
    }

    try {
      let userData = JSON.parse(localStorage.getItem('userData') || '');
      this.jwtToken = userData.token;
    } catch (error) {}

    if (this.jwtToken) {
      return this.prepareUrlAndHeaders(req, next, skipLoader);
    }

    return this.prepareUrlAndHeaders(req, next, skipLoader);
  }

  private prepareUrlAndHeaders(
    req: HttpRequest<any>,
    next: HttpHandler,
    skipLoader: boolean = false
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      url:
        req.url.indexOf('http://') === 0 || req.url.indexOf('https://') === 0
          ? req.url
          : this.baseURL + req.url,
      setHeaders: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });

    //Make request
    return next.handle(req).pipe(
      timeout(1000 * this.defaultTimeout),
      map((event) => {
        if (event instanceof HttpResponse) {
          if (!skipLoader) {
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              // this.spinner.hide();
            }, 1000 * 1);
          }
        }

        return event;
      }),
      catchError((res: HttpErrorResponse) => {
        console.log('httperror', res);

        // if (error.status == 401) {
        //   this.appSettingsService.sessionExpire().then((flag) => {
        //     console.log(flag);
        //     if (flag) {
        //       window.location.href = '/auth/login';
        //     }
        //   });
        // }
        return throwError(parseResponse(res.error));
      })
    );
  }
}
