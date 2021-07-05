import { IUserInterface } from './../../common/interfaces/IUserInfo.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public autorizationToken = new BehaviorSubject<string | null>(null);
  public loggedInUserInformation: IUserInterface | null = null;
  constructor() { }
}
