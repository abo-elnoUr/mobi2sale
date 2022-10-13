import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './../../shared/models/employee';
import { Department } from './../../shared/models/department';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = "http://algosys-001-site8.ctempurl.com/api/V1/";

  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Employee ************************************

  // get all emlpoyees
  getEmployees(): Observable<Employee[]> {
    return this._HttpClient.get<Employee[]>(this.apiUrl + 'Employee')
  }

  // add employee
  addEmployee(employee: any): Observable<Employee[]> {
    return this._HttpClient.post<Employee[]>(this.apiUrl + 'Employee', employee)
  }

  // ************************************ Governorate ************************************

  // get all Governorate
  getGovernorate(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Governorate')
  }

  // get all District id
  getAllDistrict(id: string): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `District/${id}`)
  }

  // ************************************ Departments ************************************

  // get all departments
  getDepartments(): Observable<Department[]> {
    return this._HttpClient.get<Department[]>(this.apiUrl + 'Department')
  }
}
