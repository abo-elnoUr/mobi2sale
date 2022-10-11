import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user';
import { Product } from '../../shared/models/products';
import { Brand } from '../../shared/models/brands';

import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = "http://algosys-001-site8.ctempurl.com/api/V1/";
  isLogin: boolean = false
  showNav: boolean = false

  constructor(private _HttpClient: HttpClient) { }

  // *************************************** login ******************************************

  // user login
  login(loginData: User): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Account/Login', loginData)
  }

  // *************************************** category ******************************************

  // get all category
  getAllCategory(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Category')
  }

  // get one category
  getOneCategory(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `Category/${id}`)
  }

  // update category
  updateCategory(category: any, id: any): Observable<any> {
    return this._HttpClient.put<Product>(this.apiUrl + `Category/${id}`, category)
  }

  // add category
  addCategory(category: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Category', category)
  }

  // delete category
  deleteCategory(id: any): Observable<any> {
    return this._HttpClient.delete(this.apiUrl + `Category/${id}`)
  }

  // *************************************** brands ******************************************

  // get one brands
  getBrand(id: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `/Subcategory/${id}`)
  }

  // add brand
  addBrand(brand: any): Observable<any> {
    return this._HttpClient.post(this.apiUrl + 'Subcategory', brand)
  }

  // get all brands
  getBrands(idProduct: any): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `Subcategory/GetSubcategories/${idProduct}`)
  }

  // get all brands with pagination
  getBrandsWithPagination(idProduct: string, searchText: string): Observable<any> {
    return this._HttpClient.post(this.apiUrl + `Subcategory/GetSubcategories/${idProduct}`, {searchText})
  }

  // update brand
  updateBrand(brand: any, id: any) {
    return this._HttpClient.put(this.apiUrl + `Subcategory/${id}`, brand)
  }

  // delete brand
  deleteBrand(id: any): Observable<any> {
    return this._HttpClient.delete(this.apiUrl + `/Subcategory/${id}`)
  }

  // *************************************** items (product) ******************************************

  // add items (product)
  addItem(item: any): Observable<Item> {
    return this._HttpClient.post<Item>(this.apiUrl + 'Item', item)
  }

  // get all items without pagination
  getAllItems(subcatId: string): Observable<any> {
    return this._HttpClient.get<any>(this.apiUrl + `Item/GetAllItems/${subcatId}`)
  }

  // get all items with pagination
  getAllItemsWithSearch(subcatId: string, searchText: string): Observable<any> {
    return this._HttpClient.post<any>(this.apiUrl + `Item/GetItems/${subcatId}`, {searchText})
  }

  // get one item
  getOneItem(id: string) : Observable<Item>{
    return this._HttpClient.get<Item>(this.apiUrl + `Item/${id}`)
  }

  // edit item
  updateItem(item: any, id: string) :Observable<Item>{
    return this._HttpClient.put<Item>(this.apiUrl + `Item/${id}`, item)
  }

  // delete item
  deleteItem(id: string) :Observable<Item>{
    return this._HttpClient.delete<Item>(this.apiUrl + `Item/${id}`)
  }
}
