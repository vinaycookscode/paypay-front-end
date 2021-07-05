import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceRoutingModule } from './performance-routing.module';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PerformanceRoutingModule,
    SharedModule
  ]
})
export class PerformanceModule { }
