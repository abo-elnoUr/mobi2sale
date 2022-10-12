import { Component, OnInit } from '@angular/core';
import { Employee } from './../../../models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = []
  addEmployeeForm: FormGroup
  governorates: any[] = []
  districts: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup({
      DepartmentId: new FormControl('', Validators.required),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      DateOfBrith: new FormControl('', Validators.required),
      Mobile1: new FormControl('', Validators.required),
      Mobile2: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      taxRecordNumber: new FormControl('', Validators.required),
      tradeRecordNumber: new FormControl('', Validators.required),
      taxRecordUrl: new FormControl('', Validators.required),
      tradeRecordUrl: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    // call functions


  }

  // add employee
  onPickImageVisa(event: any){

  }

  onPickImageEmp(event: any){

  }

  onAddSelectGov(event: any){

  }

  onAddSelectDistrict(event: any){

  }

  addEmployee(){

  }

}
