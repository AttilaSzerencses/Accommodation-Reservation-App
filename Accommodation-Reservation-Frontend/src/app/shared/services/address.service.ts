import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/address';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiServerUrl}/request/address/add`, address);
  }

  public getAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(`${this.apiServerUrl}/request/address/all`);
  }

  public getAddressById(id: number): Observable<Address>{
    return this.http.get<Address>(`${this.apiServerUrl}/request/address/findById/${id}`);
  }

  public updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiServerUrl}/request/address/update`, address);
  }

  public deleteAddressById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/request/address/deleteById/${id}`);
  }

}
