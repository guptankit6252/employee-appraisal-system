import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  [x: string]: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetEmployeeForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeForm: FormGroup;
  // subjectArray: Subject[] = [];
  DepartmentArray: any = ['Accounts and Finance', 'Production', 'Marketing', 'Purchasing', 'Research and Development'];

  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private employeeApi: ApiService
  ) { }

  /* Reactive book form */
  submitBookForm() {
    this.employeeForm = this.fb.group({
      employee_name: ['', [Validators.required]],
      employee_email: ['', [Validators.required]],
      department: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      doj: ['', [Validators.required]],
      gender: ['Male']
    })
  }

  // /* Add dynamic languages */
  // add(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //   // Add language
  //   if ((value || '').trim() && this.subjectArray.length < 5) {
  //     this.subjectArray.push({ name: value.trim() })
  //   }
  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }
  // }

  // /* Remove dynamic languages */
  // remove(subject: Subject): void {
  //   const index = this.subjectArray.indexOf(subject);
  //   if (index >= 0) {
  //     this.subjectArray.splice(index, 1);
  //   }
  // }  

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.employeeForm.get('doj').setValue(convertDate, {
      onlyself: true
    })
  }  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  }  

  /* Submit book */
  submitEmployeeForm() {
    if (this.employeeForm.valid) {
      this.employeeApi.AddEmployee(this.employeeForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      });
    }
  }

}