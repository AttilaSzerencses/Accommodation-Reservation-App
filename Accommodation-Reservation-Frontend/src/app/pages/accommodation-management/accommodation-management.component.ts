import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Room } from 'src/app/shared/models/room';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css']
})
export class AccommodationManagementComponent implements OnInit {

  userId: number = Number(localStorage.getItem("userId"))
  accommodations: Accommodation[]
  rooms: Room[]
  constructor(private router: Router, private accommodationService: AccommodationService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.getAllAccommodationsByPersonId();
    this.getAllRooms();
  }

  public getAllAccommodationsByPersonId() {
    this.accommodationService.getAllAccommodationByPersonId(this.userId).toPromise().then(data => {
      if(data != undefined) {
        this.accommodations = data;
      }
    });
  }

  public getAllRooms() {
    this.roomService.getRooms().toPromise().then(data => {
      if(data != undefined) {
        this.rooms = data;
      }
    });
  }

  public redirectToCreateAccommodation() {
    this.router.navigate(['/createAccommodation']);
  }

  public redirectToCreateRoom(accommodation: Accommodation) {
    window.open(`http://localhost:4200/createRoom?accommodation=${accommodation.id}`, '_self');
  }

  public updateAccommodation(accommodation: Accommodation) {
    window.open(`http://localhost:4200/createAccommodation?accommodation=${accommodation.id}`, '_self');
  }

  public deleteAccommodation(accommodation: Accommodation) {

  }

  public updateRoom(accommodation: Accommodation, room: Room){
    window.open(`http://localhost:4200/createRoom?accommodation=${accommodation.id}&room=${room.id}`, '_self');
  }

  public deleteRoom(accommodation: Accommodation, room: Room){

  }

  public IsIdMatch(accommoditon: Accommodation, room: Room) {
    console.log(this.rooms.length);
    
    if (accommoditon === undefined || room === undefined) return false;
    if (accommoditon.id === room.accommodation?.id){
      return true;
    }
    return false;
  }

}
