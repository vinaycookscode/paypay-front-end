import { IUserInterface } from './../../common/interfaces/IUserInfo.interface';
import { Router } from '@angular/router';
import { IApiResponse } from './../../common/interfaces/IApiResponse.interface';
import { Component, OnInit } from '@angular/core';
import { ILogin } from 'src/app/common/interfaces/login.interface';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/shared/services/shared.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginDetails: ILogin = {
    email: '',
    password: ''
  };
  isFormSubmitted = false;
  constructor(
    private loginService: LoginService,
    private toasterService: ToastrService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.isFormSubmitted = true;
    if (this.loginDetails.email && this.loginDetails.password) {
        this.loginService.login(this.loginDetails).subscribe( (loginResponse: IApiResponse) => {
          if (loginResponse.status) {
            const decodedToken: IUserInterface = jwt_decode(loginResponse?.data);
            this.sharedService.autorizationToken.next(loginResponse.data);
            localStorage.setItem('token', loginResponse?.data);
            this.sharedService.loggedInUserInformation = decodedToken;
            this.router.navigate(['/emp/list']);
          } else {
            this.toasterService.error('Please provide valid user name and password', 'Error');
          }
      }, error => {
        this.toasterService.error('Please provide valid user name and password', 'Error');
      });
    }
  }

}
