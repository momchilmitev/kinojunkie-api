import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AppState } from '@types';
import { Store, select } from '@ngrx/store';
import { tokenSelector } from '../shared/stores/auth/selectors';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    token$!: Observable<string | null>;

    constructor(private strore: Store<AppState>) {
      this.token$ = this.strore.pipe(select(tokenSelector));
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        return this.token$.pipe(
          switchMap(t => {
            if (t) {
              request = request.clone({
                  setHeaders: { Authorization: `Bearer ${t}` }
              });
            }
  
            return next.handle(request);
          })
        )
    }
}