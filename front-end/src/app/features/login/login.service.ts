import { ILogin } from './../../common/interfaces/login.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/common/interfaces/IApiResponse.interface';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL = environment.API_URL;
  constructor(
    private http: HttpClient
  ) { }

  login(loginInfo: ILogin): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.API_URL + 'user/login/', loginInfo);
  }
}
