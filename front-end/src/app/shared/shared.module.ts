import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsComponent } from './components/chips/chips.component';

@NgModule({
  declarations: [
    NavBarComponent,
    ChipsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavBarComponent,
    ChipsComponent
  ]
})
export class SharedModule { }
