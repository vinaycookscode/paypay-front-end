import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { AddEditEmployeeComponent } from './add-edit-employee/add-edit-employee.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add-edit', component: AddEditEmployeeComponent },
  { path: 'add-edit/:id', component: AddEditEmployeeComponent },
  { path: 'list', component: ListEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
