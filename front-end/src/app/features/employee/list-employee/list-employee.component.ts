import { IApiResponse } from './../../../common/interfaces/IApiResponse.interface';
import { IUserInterface } from 'src/app/common/interfaces/IUserInfo.interface';
import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NAVIGATE_CONSTANTS, USER_ROLES_ENUM, USER_ROLES_ON_SCREEN } from 'src/app/core/constants/global.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit {
  allEmployeeList: IUserInterface[] | null = null;
  USER_ROLES_ON_SCREEN: { [key: string]: string }  = USER_ROLES_ON_SCREEN;
  NAVIGATE_CONSTANTS = NAVIGATE_CONSTANTS;
  constructor(
    private employeeService: EmployeeService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.getAllEmployeeList();
  }

  ngOnInit(): void {
  }

  getAllEmployeeList(): void {
    this.employeeService.getAllEmployee().subscribe( (apiResponse: IApiResponse) => {
      if (apiResponse.status) {
        this.allEmployeeList = apiResponse.data;
        console.log(this.allEmployeeList);
      } else {
        this.allEmployeeList = [];
      }
    }, (error: Error) => {
      this.toaster.error('Error while fetching employee list', 'Error');
      this.router.navigate(['']);
      console.log(error.message);
    });
  }

  getRoleString(currentUserInformation: IUserInterface): string {
    return this.USER_ROLES_ON_SCREEN[currentUserInformation.role];
  }

  getRoleWiseStyle(currentUserInformation: IUserInterface): object {
    const styleObject: any = {};
    if (currentUserInformation?.role === USER_ROLES_ENUM.ADMIN) {
      styleObject['background-color'] = 'green';
    } else if (currentUserInformation?.role === USER_ROLES_ENUM.SUPER) {
      styleObject['background-color'] = 'orange';
    } else if (currentUserInformation?.role === USER_ROLES_ENUM.USER) {
      styleObject['background-color'] = 'blue';
    }
    return styleObject;
  }

  deleteUser(userId: string | undefined): void {
    if (userId) {
      this.employeeService.deleteEmployee(userId).subscribe( (apiResponse: IApiResponse) => {
        if (apiResponse.status) {
          this.toaster.success('User deleted successfully', 'Success');
        } else {
          this.toaster.error('Error while deleting record', 'Error');
        }
      }, (error: Error) => {
        this.toaster.error('Error while deleting employee record', 'Error');
        console.log(error.message);
      });
    }
  }

  navigate(currentNavigation: NAVIGATE_CONSTANTS, currentEmployeeInfo: IUserInterface | null = null): void {
    switch ( currentNavigation ) {
      case NAVIGATE_CONSTANTS.ADD_USER:
        this.employeeService.currentSelectedEmployee.next(null);
        this.router.navigate(['/emp/add-edit']);
        break;
      case NAVIGATE_CONSTANTS.DELETE_USER:
        this.deleteUser(currentEmployeeInfo?._id);
        break;
      case NAVIGATE_CONSTANTS.EDIT_USER:
        this.employeeService.currentSelectedEmployee.next(currentEmployeeInfo);
        this.router.navigate(['/emp/add-edit', currentEmployeeInfo?._id]);
        break;
      case NAVIGATE_CONSTANTS.ADD_PERFORMANCE_REVIEW:
        this.employeeService.currentSelectedEmployee.next(currentEmployeeInfo);
        this.router.navigate(['perf/add']);
        break;
      default:
        console.log('No case match');
    }
  }

  toggleActiveInActive(currentEmployeeInfo: IUserInterface): void {
    this.employeeService.toggleUserStatus(currentEmployeeInfo._id, !currentEmployeeInfo.isActive).
    subscribe( (apiResponse: IApiResponse) => {}, (error: Error) => {
      this.toaster.error('Error while changing the status', 'Error');
      currentEmployeeInfo.isActive = !currentEmployeeInfo.isActive;
      console.log(error.message);
    });
  }

}
