import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Product } from '../../shared/models/products';
import { Brand } from '../../shared/models/brands';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl="http://algosys-001-site8.ctempurl.com/api/V1/";
  isLogin: boolean = false
  showNav: boolean = false

  constructor(private _HttpClient: HttpClient) { }

  // user login
  login(loginData: User): Observable<any>{
     return this._HttpClient.post(this.apiUrl + 'Account/Login', loginData)
  }

  // category
  getAllCategory(): Observable<any>{
  return this._HttpClient.get(this.apiUrl + 'Category')
  }

  getOneCategory(id: any): Observable<any>{
    return this._HttpClient.get(this.apiUrl + `Category/${id}`)
  }

  updateCategory(category: any, id: any): Observable<any>{
    return this._HttpClient.put<Product>(this.apiUrl + `Category/${id}`, category)
  }

  addCategory(category: any) : Observable<any>{
    return this._HttpClient.post(this.apiUrl + 'Category', category)
  }
  deleteCategory(id: any) : Observable<any>{
    return this._HttpClient.delete(this.apiUrl + `Category/${id}`)
  }

  // brands
  getBrand(id: any) : Observable<any>{
    return this._HttpClient.get(this.apiUrl + `/Subcategory/${id}`)
  }

  addBrand(brand: any): Observable<any>{
    return this._HttpClient.post(this.apiUrl + 'Subcategory', brand)
  }

  getBrands(idProduct: any): Observable<any>{
    return this._HttpClient.get(this.apiUrl + `Subcategory/GetSubcategories/${idProduct}`)
  }

  updateBrand(brand: any, id: any){
    return this._HttpClient.put(this.apiUrl + `Subcategory/${id}`, brand)
  }

  deleteBrand(id: any) :Observable<any>{
    return this._HttpClient.delete(this.apiUrl + `/Subcategory/${id}`)
  }

}
