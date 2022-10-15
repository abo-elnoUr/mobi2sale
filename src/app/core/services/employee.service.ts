import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from './../../shared/models/employee';
import { Department } from './../../shared/models/department';
import { SalesMan } from './../../shared/models/salesMan';

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

  // get employee by id
  getEmployee(id: string) :Observable<any>{
    return this._HttpClient.get<any>(this.apiUrl + `Employee/${id}`)
  }

  // edit employee
  editEmployee(id: string, emp:any) :Observable<Employee>{
    return this._HttpClient.put<Employee>(this.apiUrl + `Employee/${id}`, emp)
  }

  // delete employee
  deleteEmployee(id: string) :Observable<Employee>{
    return this._HttpClient.delete<Employee>(this.apiUrl + `Employee/${id}`)
  }

  // ************************************ Governorate ***********************************

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

  // ************************************ SalesMen ***************************************

  // get all salesmen
  getSalesMen(): Observable<any> {
    return this._HttpClient.get<SalesMan>(this.apiUrl + 'Salesman')
  }

  // add salesman
  addSalesMan(sales: SalesMan): Observable<any> {
    return this._HttpClient.post<SalesMan>(this.apiUrl + 'Salesman', sales)
  }

  // get one salesman
  getOneSalesMan(id: string) :Observable<any>{
    return this._HttpClient.get<SalesMan>(this.apiUrl + `Salesman/${id}`)
  }

  // edit sales man
  updateSalesMan(id: string, sales: SalesMan) :Observable<SalesMan>{
    return this._HttpClient.put<SalesMan>(this.apiUrl + `Salesman/${id}`, sales)
  }

  // delete sales man
  deleteSalesMan(id: string) :Observable<SalesMan>{
    return this._HttpClient.delete<SalesMan>(this.apiUrl + `Salesman/${id}`)
  }
}
