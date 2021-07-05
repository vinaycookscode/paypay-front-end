import { EmployeeRoutingModule } from './employee-routing-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListEmployeeComponent } from './list-employee/list-employee.component';



@NgModule({
  declarations: [AddEditEmployeeComponent, ListEmployeeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
