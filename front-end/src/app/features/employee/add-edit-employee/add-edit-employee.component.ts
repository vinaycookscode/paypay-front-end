import { IApiResponse } from './../../../common/interfaces/IApiResponse.interface';
import { EmployeeService } from './../employee.service';
import { IUserInterface } from './../../../common/interfaces/IUserInfo.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DB_ROLES_BY_STRING, GENDER_TYPES, USER_ROLES_ENUM, USER_ROLES_FOR_VIEW } from 'src/app/core/constants/global.constant';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  isFormSubmitted = false;
  GENDER_TYPES = GENDER_TYPES;
  USER_ROLES_ENUM = USER_ROLES_ENUM;
  title = 'Add Employee';
  buttonTitle = 'Save';
  constructor(
    private fb: FormBuilder,
    public employeeService: EmployeeService,
    private toaster: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.employeeForm = this.fb.group( {
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      photo: [null],
      hobby: [''],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (parameter: any) => {
      if (Object.keys(parameter).length) {
        this.title = 'Edit Employee';
        this.buttonTitle = 'Update';
        if (parameter.id && !this.employeeService.currentSelectedEmployee.value) {
          this.getEmployeeInformation(parameter.id);
        } else {
          this.setInformationForEdit(this.employeeService.currentSelectedEmployee.value);
        }
      } else {
        this.title = 'Add Employee';
        this.buttonTitle = 'Save';
      }
    });
  }

  addEdit(): void {
    this.isFormSubmitted = true;
    if (!this.employeeForm.invalid) {
      if (!this.employeeService.currentSelectedEmployee.value) {
        this.addEmployee(this.employeeForm.value);
      } else {
        this.editEmployee(this.employeeForm.value);
      }
    }
  }

  addEmployee(employeeData: IUserInterface): void {
    this.employeeService.createNewEmployee(employeeData).subscribe( (apiResponse: IApiResponse) => {
      if (apiResponse.status) {
        this.toaster.success('Employee is created successfully !!!', 'Success');
      } else {
        this.toaster.error('Error while creating an employee', 'Error');
      }
    }, (error: Error) => {
      this.toaster.error('Error while creating an employee', 'Error');
      console.log(error.message);
    });
  }

  getEmployeeInformation(employeeId: string): void {
    this.employeeService.getEmployeeInformation(employeeId).subscribe( (apiResponse: IApiResponse) => {
      if (apiResponse.status) {
        this.employeeService.currentSelectedEmployee.next(apiResponse.data[0]);
        this.setInformationForEdit(apiResponse.data[0]);
      } else {
        this.toaster.error('Error while getting an information', 'Error');
      }
    }, (error: Error) => {
      this.toaster.error('Error while getting an information', 'Error');
      console.log(error.message);
    });
  }

  setInformationForEdit(userInformation: IUserInterface | null): void {
    if (userInformation) {
      this.employeeForm.patchValue({
        name: userInformation.name,
        email: userInformation.email,
        address: userInformation.address,
        city: userInformation.city,
        state: userInformation.state,
        photo: null,
        hobby: userInformation.hobby,
        password: userInformation.password,
        gender: userInformation.gender,
        role: USER_ROLES_FOR_VIEW[userInformation.role],
      });
      this.employeeForm.get('password')?.setValidators(null);
      this.employeeForm.get('password')?.disable();
    }
  }

  editEmployee(userInformation: IUserInterface): void {
    userInformation._id = this.employeeService.currentSelectedEmployee.value ? this.employeeService.currentSelectedEmployee.value?._id : '';
    userInformation.role = DB_ROLES_BY_STRING[userInformation.role];
    userInformation.isActive = true;
    this.employeeService.editExistingEmployee(userInformation).subscribe( (apiResponse: IApiResponse) => {
      if (apiResponse.status) {
        this.toaster.success('Employee is updated successfully !!!', 'Success');
        this.router.navigate(['/emp/list']);
      } else {
        this.toaster.error('Error while updating an employee', 'Error');
      }
    }, (error: Error) => {
      this.toaster.error('Error while updating an employee', 'Error');
      console.log(error.message);
    });
  }

  get employeeFormControls(): any {
    return this.employeeForm.controls;
  }

  back(): void {
    history.back();
  }
}
