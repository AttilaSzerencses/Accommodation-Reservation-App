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

  public addRoom(room: Room, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('room', JSON.stringify(room));
    return this.http.post<string>(`${this.apiServerUrl}/request/room/add`, formData);
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

  public updateRoom(room: Room, image?: File): Observable<String> {
    const formData = new FormData();
    if(image !== undefined) formData.append('image', image);
    formData.append('room', JSON.stringify(room));
    return this.http.put<String>(`${this.apiServerUrl}/request/room/update`, formData);
  }

  public deleteRoomById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/request/room/deleteById/${id}`);
  }

  public getAvailableRoomsWithAccomodationIdAndDate(accommodationId: number, startDate: string, endDate: string, persons: number): Observable<Array<Room>> {
    return this.http.get<Room[]>(`${this.apiServerUrl}/request/room/available?hotelId=${accommodationId}&startDate=${startDate}&endDate=${endDate}&persons=${persons}`);
  }

  public getAvailableRoomsByRoomCapacityAndHotelId(accommodationId: number, persons: number): Observable<Array<Room>> {
    return this.http.get<Room[]>(`${this.apiServerUrl}/request/room/availableByCapacity?hotelId=${accommodationId}&persons=${persons}`);
  }



}
