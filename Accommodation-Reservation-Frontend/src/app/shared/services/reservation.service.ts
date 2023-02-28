import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getReservations(): Observable<Reservation[]>{
    return this.http.get<Reservation[]>(`${this.apiServerUrl}/request/reservation/all`);
  }

  public add(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiServerUrl}/request/reservation/add`, reservation);
  }

  public getReservationByUserId(personId: number): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiServerUrl}/request/reservation/findByUserId/${personId}`);
  }

  public getReservationById(id: number): Observable<Reservation>{
    return this.http.get<Reservation>(`${this.apiServerUrl}/request/reservation/findById/${id}`);
  }

  public updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiServerUrl}/request/reservation/update`, reservation);
    
  }

  public deleteReservationById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/request/reservation/deleteById/${id}`);
  }

  public deleteReservationByUserId(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/request/reservation/deleteByUserId/${personId}`);
  }


}
