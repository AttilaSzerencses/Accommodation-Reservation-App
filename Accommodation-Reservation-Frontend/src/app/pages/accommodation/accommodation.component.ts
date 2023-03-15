import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Amenity } from 'src/app/shared/models/amenity';
import { Room } from 'src/app/shared/models/room';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  accommodationID: number = 0;
  persons: number = 1;
  searchStartDate: string;
  searchEndDate: string;
  accommodation: Accommodation;
  amenities: Array<Amenity>;
  rooms: Array<Room>;
  freeRoomsInDate: Array<Room>;
  notFreeRoomsInDate: Array<Room> = [];
  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService, private roomService: RoomService, private personService: PersonService, private datePipe: DatePipe) { }

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });


  ngOnInit(): void {
    this.getSentParamsFromUrl();
    this.getAccomodationById(this.accommodationID);
    this.getRoomsById(this.accommodationID);
  }

  public getSentParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.accommodationID = params['accommodation'] || 0;
      this.persons = params['persons'];
      this.searchStartDate = params['startDate'];
      this.searchEndDate = params['endDate'];
    })
    this.range.get('start')?.setValue(this.searchStartDate);
    this.range.get('end')?.setValue(this.searchEndDate);
  }


  public getAccomodationById(accommodationID: number) {
    if (this.accommodationID == 0) {
      this.router.navigate(['/main']);
    }
    this.accommodationService.getAccommodationById(accommodationID).subscribe((data: Accommodation) => {
      this.accommodation = data;
      if (data.amenities !== undefined && data.amenities !== null) {
        this.amenities = data.amenities;
      }
    });
  }

  public getRoomsById(accommodationId: number) {
    if (this.accommodationID == 0) {
      this.router.navigate(['/main']);
    }
    this.roomService.getRoomsByAccommodationId(accommodationId).toPromise().then(data => {
      if (data !== undefined) {
        this.rooms = data;
        this.freeRoomsInDate = data;
      } else {
        this.rooms = [];
        this.freeRoomsInDate = [];
      }
      this.setFreeRooms(this.rooms);
    });
  }

  public setFreeRooms(rooms: Array<Room>) {
    if (this.searchStartDate !== "" && this.searchEndDate !== "" && this.searchStartDate !== "1970-01-01" && this.searchEndDate !== "1970-01-01") {
      this.freeRoomsInDate = [];
      this.roomService.getAvailableRoomsWithAccomodationIdAndDate(this.accommodationID, this.searchStartDate, this.searchEndDate, this.persons).toPromise().then(data => {
        if (data !== undefined) {
          this.freeRoomsInDate = data;
          this.notFreeRoomsInDate = rooms.filter(room => {
            return !this.freeRoomsInDate.some(freeRoom => freeRoom.id === room.id);
          });
        } else {
          this.freeRoomsInDate = [];
          this.notFreeRoomsInDate = rooms;
        }
      });
    }
  }

  public forwardToReservation(room: Room) {
    if (!this.personService.isLoggedIn()) {
      this.errorAlertForNotLoggedInUser();
    } else if (this.searchStartDate === "" || this.searchEndDate === "") {
      this.errorAlertForMissingDate();
    } else {
      window.open(`http://localhost:4200/reservation?roomId=${room?.id}&persons=${this.persons}&startDate=${this.searchStartDate}&endDate=${this.searchEndDate}`, '_self');
    }
  }

  incrementAdults() {
    this.persons++;
  }

  decrementAdults() {
    if (this.persons > 1) this.persons--;
  }

  refresh() {
    this.searchStartDate = this.datePipe.transform(new Date(this.range.get("start")?.value), "yyyy-MM-dd") || "";
    this.searchEndDate = this.datePipe.transform(new Date(this.range.get("end")?.value), "yyyy-MM-dd") || "";
    window.open(`http://localhost:4200/accommodation?accommodation=${this.accommodationID}&persons=${this.persons}&startDate=${this.searchStartDate}&endDate=${this.searchEndDate}`, '_self');
  }

  public errorAlertForNotLoggedInUser() {
    Swal.fire({
      icon: 'error',
      title: 'You have to log in!',
      text: 'You have to log in to book the accommodation!',
    })
  }

  public errorAlertForMissingDate() {
    Swal.fire({
      icon: 'error',
      title: 'You cant book the room!',
      text: 'You have to set the reservation date for booking the room!',
    })
  }

}

