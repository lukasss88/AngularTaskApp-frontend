import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) { }

  intercept(req, next) {
    let cloneReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.loginService.getToken() 
      }
    });
    return next.handle(cloneReq)
  }


}
