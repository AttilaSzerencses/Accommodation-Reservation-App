import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Accommodation } from '../models/accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getAccommodations(): Observable<Accommodation[]>{
    return this.http.get<Accommodation[]>(`${this.apiServerUrl}/request/accommodation/all`);
  }

  public getAccommodationById(id: number): Observable<Accommodation>{
    return this.http.get<Accommodation>(`${this.apiServerUrl}/request/accommodation/findById/${id}`);
  }

  public getAccommodationByCity(city: string): Observable<Accommodation>{
    return this.http.get<Accommodation>(`${this.apiServerUrl}/request/accommodation/findByCity/${city}`);
  }

  public getAllAccommodationByPersonId(personId: number): Observable<Accommodation[]>{
    return this.http.get<Accommodation[]>(`${this.apiServerUrl}/request/accommodation/findAllByPersonId/${personId}`);
  }

  public getAccommodationByName(name: string): Observable<Accommodation>{
    return this.http.get<Accommodation>(`${this.apiServerUrl}/request/accommodation/findByName/${name}`);
  }

  public addAccommodation(accommodation: Accommodation, image: File, secondImage: File, thirdImage: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('secondImage', secondImage);
    formData.append("thirdImage", thirdImage)
    formData.append('accommodation', JSON.stringify(accommodation));
    return this.http.post<string>(`${this.apiServerUrl}/request/accommodation/add`, formData);
  }

  public deleteAccommodationById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/request/accommodation/deleteById/${id}`);
  }

  public updateAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.put<Accommodation>(`${this.apiServerUrl}/request/accommodation/update`, accommodation);
  }

}
