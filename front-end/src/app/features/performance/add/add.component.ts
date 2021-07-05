import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  perforamanceForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) {
    this.perforamanceForm = this.formBuilder.group( {
      worksToFullPotantial: ['', Validators.required],
      qualityOfWork: ['', Validators.required],
      workConsistancy: ['', Validators.required],
      communication: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  savePerformanceReview(): void {
    if (!this.perforamanceForm.invalid) {
      console.log('performance data to save', this.perforamanceForm.value);
    } else {
      console.log('performance data to save', this.perforamanceForm.value);
      this.toaster.warning('Please fill all details', 'Warning');
    }
  }

  get perforanceForm(): any {
    return this.perforamanceForm.controls;
  }
}
