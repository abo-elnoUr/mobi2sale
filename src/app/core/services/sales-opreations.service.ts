import { Client } from 'src/app/shared/models/clients';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SubDepartment } from 'src/app/shared/models/subDepartment';
import { Branch } from 'src/app/shared/models/branchs';
import { Item } from 'src/app/shared/models/item';
import { Brand } from './../../shared/models/brands';
import { SalesMan } from 'src/app/shared/models/salesMan';

@Injectable({
  providedIn: 'root'
})
export class SalesOpreationsService {

  apiUrl = "http://algosys-001-site8.ctempurl.com/api/V1/";

  constructor(private _HttpClient: HttpClient) { }

  // *************************************** category ******************************************

  // get all category
  getAllCategory(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Category')
  }

  // *************************************** brands (subcategory) ******************************************

  // get all subDepartments (brands)
  getAllSubDepartments(): Observable<SubDepartment[]> {
    return this._HttpClient.post<SubDepartment[]>(this.apiUrl + 'SubDepartment/Stores', {})
  }

  // *************************************** items (product) ******************************************

  // get all items without pagination
  getAllItems(subcatId: string): Observable<Item[]> {
    return this._HttpClient.get<Item[]>(this.apiUrl + `Item/GetAllItems/${subcatId}`)
  }

  // get one item
  getOneItem(id: string): Observable<Item> {
    return this._HttpClient.get<Item>(this.apiUrl + `Item/${id}`)
  }

  // ************************************ Branches ************************************

  // get all branches
  getAllBranches(): Observable<Branch[]> {
    return this._HttpClient.get<Branch[]>(this.apiUrl + 'Branch')
  }

  // ************************************ brands ************************************

  // get all brands
  getBrands(idProduct: string): Observable<Brand[]> {
    return this._HttpClient.get<Brand[]>(this.apiUrl + `Subcategory/GetSubcategories/${idProduct}`)
  }

  // ************************************ SalesMen ***************************************

  // get all salesmen
  getSalesMen(): Observable<any> {
    return this._HttpClient.get<SalesMan>(this.apiUrl + 'Salesman')
  }

  // ************************************ clients ***************************************

  // get all clients
  getClients(): Observable<Client[]> {
    return this._HttpClient.get<Client[]>(this.apiUrl + 'Client')
  }

  // ************************************ Oder Exchange ***************************************

  // get all order exchange
  getOrderExchange(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'OrderExchange')
  }
}
