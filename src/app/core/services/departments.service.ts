import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubDepartment } from './../../shared/models/subDepartment';
import { Branch } from './../../shared/models/branchs';
import { BranchRefund } from './../../shared/models/branchRefund';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  apiUrl = "http://algosys-001-site8.ctempurl.com/api/V1/";

  constructor(private _HttpClient: HttpClient) { }


  // ************************************ employee ************************************

  // get all employees
  getEmployees(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Employee')
  }

  // get one employee
  getEmployee(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `Employee/${id}`)
  }


  // ************************************ departments ************************************

  //get department
  getDepartments(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Department')
  }

  // add department
  addDepartment(department: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Department', department)
  }

  // get department
  getOneDepartment(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `Department/${id}`)
  }

  // edit department
  editDepartment(department: any, id: any): Observable<any> {
    return this._HttpClient.put(this.apiUrl + `Department/${id}`, department)
  }

  // delete department
  deleteDepartment(id: any): Observable<any> {
    return this._HttpClient.delete(this.apiUrl + `Department/${id}`)
  }

  // ************************************ subDepartment ************************************

  // add subdepartment
  addSubDepartment(subDepartment: SubDepartment): Observable<SubDepartment> {
    return this._HttpClient.post<SubDepartment>(this.apiUrl + 'SubDepartment', subDepartment)
  }

  // get all subDepartments
  getAllSubDepartments(): Observable<SubDepartment[]> {
    return this._HttpClient.post<SubDepartment[]>(this.apiUrl + 'SubDepartment/Stores', {})
  }

  // get subdepartment by id
  getSupdepartmentById(deptId: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'SubDepartment/GetSub', { deptId })
  }

  // get subdepartment by search text
  getSupdepartmentByText(searchText: any, deptId: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'SubDepartment/GetSub', { searchText, deptId })
  }

  // get subDepartment by id
  getSubDepartmentById(id: string): Observable<SubDepartment> {
    return this._HttpClient.get<SubDepartment>(this.apiUrl + `SubDepartment/${id}`)
  }

  // edit subdepartment
  editSubDepartment(subDepartment: any, id: any): Observable<any> {
    return this._HttpClient.put(this.apiUrl + `SubDepartment/${id}`, subDepartment)
  }

  // delete subDepartment
  deleteSupDepartment(id: string): Observable<SubDepartment> {
    return this._HttpClient.delete<SubDepartment>(this.apiUrl + `SubDepartment/${id}`)
  }

  // ************************************ Branches ************************************

  // get all branches
  getAllBranches(): Observable<Branch[]> {
    return this._HttpClient.get<Branch[]>(this.apiUrl + 'Branch')
  }

  // add branch
  addBranch(branch: Branch): Observable<Branch[]> {
    return this._HttpClient.post<Branch[]>(this.apiUrl + 'Branch', branch)
  }

  // get branch with id
  getBranchById(id: string): Observable<Branch> {
    return this._HttpClient.get<Branch>(this.apiUrl + `Branch/${id}`)
  }

  // edit branch
  editBranch(id: string, branchEdit: Branch[]): Observable<Branch[]> {
    return this._HttpClient.put<Branch[]>(this.apiUrl + `Branch/${id}`, branchEdit)
  }


  // delete branch
  deleteBranch(id: string): Observable<Branch[]> {
    return this._HttpClient.delete<Branch[]>(this.apiUrl + `Branch/${id}`)
  }

  // ************************************ Branches Refunds ************************************

  // get all Serials
  getAllSerials(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Branchrefund/Serial')
  }

  // ************************************ Branches Refunds To Store ************************************

  // get new serial for refund to store
  getSerialToRefundStore(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'BranchrefundToStore/Serial')
  }

  // get all branch refund to store
  getBranchRefundsToStore(): Observable<any> {
    return this._HttpClient.post<any>(this.apiUrl + 'BranchrefundToStore/Refunds', {})
  }

}
