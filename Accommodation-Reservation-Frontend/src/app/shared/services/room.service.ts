import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.apiServerUrl}/request/room/add`, room);
  }

  public getRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.apiServerUrl}/request/room/all`);
  }

  public getRoomsByAccommodationId(id: number): Observable<Room[]>{
    return this.http.get<Room[]>(`${this.apiServerUrl}/request/room/findAllByAccommodationId/${id}`);
  }

  public getRoomById(id: number): Observable<Room>{
    return this.http.get<Room>(`${this.apiServerUrl}/request/room/findById/${id}`);
  }

  public updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.apiServerUrl}/request/room/update`, room);
  }

  public deleteRoomById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/request/room/deleteById/${id}`);
  }

  public getAvailableRoomsWithAccomodationIdAndDate(accommodationId: number, startDate: string, endDate: string): Observable<Array<Room>> {
    return this.http.get<Room[]>(`${this.apiServerUrl}/request/room/available?hotelId=${accommodationId}&startDate=${startDate}&endDate=${endDate}`);
  }


}
