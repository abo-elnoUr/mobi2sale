import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './../../shared/models/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  apiUrl = "http://algosys-001-site8.ctempurl.com/api/V1/";

  constructor(private _HttpClient: HttpClient) { }

  // ************************************ Governorate ************************************

  // get all Governorate
  getGovernorate(): Observable<any> {
    return this._HttpClient.get(this.apiUrl + 'Governorate')
  }

  // get all District id
  getAllDistrict(id: string): Observable<any> {
    return this._HttpClient.get(this.apiUrl + `District/${id}`)
  }

  // ************************************ Client ************************************


  // get all client
  getClients(): Observable<Client[]> {
    return this._HttpClient.get<Client[]>(this.apiUrl + 'Client')
  }

  // add clients
  addClient(client: any): Observable<Client> {
    return this._HttpClient.post<Client>(this.apiUrl + 'Client', client)
  }

}
