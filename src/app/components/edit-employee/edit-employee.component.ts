import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from '../../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})

export class EditEmployeeComponent implements OnInit {
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
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private employeeApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.employeeApi.GetEmployee(id).subscribe(data => {
      // console.log(data.subjects)
      // this.subjectArray = data.subjects;
      this.employeeForm = this.fb.group({
        employee_name: [data.employee_name, [Validators.required]],
        employee_email: [data.employee_email, [Validators.required]],
        department: [data.department, [Validators.required]],
        rating: [data.rating, [Validators.required]],
        doj: [data.dob, [Validators.required]],
        gender: [data.gender]
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
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

  /* Update book */
  updateEmployeeForm() {
    console.log(this.employeeForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.employeeApi.UpdateEmployee(id, this.employeeForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
      });
    }
  }
  
}
