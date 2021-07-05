import { SharedService } from '../shared/services/shared.service';
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
      private sharedService: SharedService
    ) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      if (localStorage.getItem('token')) {
        req = req.clone({ headers: req.headers.set('Authorization', localStorage.getItem('token') || '') });
      }
      return next.handle(req);
    }
}
