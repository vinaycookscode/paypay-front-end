import { IApiResponse } from './../../common/interfaces/IApiResponse.interface';
import { IUserInterface } from 'src/app/common/interfaces/IUserInfo.interface';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL = environment.API_URL;
  currentSelectedEmployee = new BehaviorSubject<IUserInterface | null>(null);
  constructor(
    private httpClient: HttpClient
  ) { }

  createNewEmployee(employeeInfo: IUserInterface): Observable<IApiResponse> {
    return this.httpClient.post<IApiResponse>(this.API_URL + 'user/signup/', employeeInfo);
  }

  getAllEmployee(): Observable<IApiResponse>{
    return this.httpClient.get<IApiResponse>(this.API_URL + 'user/');
  }

  getEmployeeInformation(employeeId: string): Observable<IApiResponse>{
    return this.httpClient.get<IApiResponse>(this.API_URL + 'user/' + employeeId);
  }

  editExistingEmployee(employeeInfo: IUserInterface): Observable<IApiResponse> {
    return this.httpClient.patch<IApiResponse>(this.API_URL + 'user/edit/', employeeInfo);
  }

  deleteEmployee(empId: string): Observable<IApiResponse> {
    return this.httpClient.delete<IApiResponse>(this.API_URL + 'user/' + empId);
  }

  toggleUserStatus(empId: string, toggleStatus = false): Observable<IApiResponse> {
    return this.httpClient.delete<IApiResponse>(this.API_URL + 'user/' + 'toggle-user-status/' + empId + '/' + toggleStatus);
  }
}
