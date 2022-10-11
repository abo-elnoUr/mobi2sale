import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './../../shared/models/employee';
import { Supplier } from './../../shared/models/supplier';
import { SubDepartment } from 'src/app/shared/models/subDepartment';
import { Brand } from 'src/app/shared/models/brands';
import { Item } from 'src/app/shared/models/item';
import { AdditionVoucher } from 'src/app/shared/models/additionVoucher';

@Injectable({
  providedIn: 'root'
})
export class StoresService {

  apiUrl="http://algosys-001-site8.ctempurl.com/api/V1/";

  constructor(private _HttpClient: HttpClient) { }


  // ************************************ employee ************************************

  // get all employees
  getEmployees() :Observable<Employee[]>{
    return this._HttpClient.get<Employee[]>(this.apiUrl + 'Employee')
  }

  // ************************************ supplier ************************************

  // get all suppliers
  getSuppliers() :Observable<Supplier[]>{
    return this._HttpClient.get<Supplier[]>(this.apiUrl + 'Supplier')
  }

  // ************************************ subDepartment ( stores ) ************************************

  // get all subDepartments
  getAllSubDepartments() :Observable<SubDepartment[]>{
    return this._HttpClient.post<SubDepartment[]>(this.apiUrl + 'SubDepartment/Stores', {})
  }


  // ************************************ Category ************************************

  // get all category
  getAllCategory(): Observable<any>{
    return this._HttpClient.get(this.apiUrl + 'Category')
    }

  // ************************************ Brands ************************************

  // get all brands
  getBrands(idProduct: string): Observable<Brand[]> {
    return this._HttpClient.get<Brand[]>(this.apiUrl + `Subcategory/GetSubcategories/${idProduct}`)
  }


  // ************************************ Products ************************************

  // get all items
  getAllItems(subcatId: string): Observable<Item[]> {
    return this._HttpClient.get<Item[]>(this.apiUrl + `Item/GetAllItems/${subcatId}`)
  }

  // get one item
  getOneItem(id: string) :Observable<Item>{
    return this._HttpClient.get<Item>(this.apiUrl + `Item/${id}`)
  }

  // ************************************ Addition Voucher ************************************

  // get serial
  getSerial() :Observable<any>{
    return this._HttpClient.get(this.apiUrl + 'AdditionVoucher/Serial')
  }

  // add addition voucher
  addAdditionVoucher(addition: AdditionVoucher) :Observable<AdditionVoucher>{
    return this._HttpClient.post<AdditionVoucher>(this.apiUrl + 'AdditionVoucher', addition)
  }

  // get all addition voucher
  getAdditionVouchers() :Observable<AdditionVoucher[]>{
    return this._HttpClient.post<AdditionVoucher[]>(this.apiUrl + 'AdditionVoucher/Vouchers', {})
  }


}
