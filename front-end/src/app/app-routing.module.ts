import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'emp', loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule) },
  { path: '', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule) },
  { path: 'perf', loadChildren: () => import('./features/performance/performance.module').then(m => m.PerformanceModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
