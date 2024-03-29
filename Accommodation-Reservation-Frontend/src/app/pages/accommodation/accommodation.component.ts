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
  searchDays: number;
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
      if (data.status === "inactive" || data.status === "waiting") this.router.navigate(['/main']);
      this.accommodation = data;
      if (data.amenities !== undefined && data.amenities !== null) {
        this.amenities = data.amenities;
      }
    });
  }

  calculateDays(startDate: string, endDate: string) {
    let checkInDate = new Date(startDate);
    let checkOutDate = new Date(endDate);

    let days = Math.floor((checkOutDate.getTime() - checkInDate.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }

  public getRoomsById(accommodationId: number) {
    if (this.accommodationID == 0) {
      this.router.navigate(['/main']);
    }
    this.roomService.getRoomsByAccommodationId(accommodationId).toPromise().then(data => {
      if (data !== undefined) {
        this.rooms = data.filter(room => room.status !== "inactive");
        this.freeRoomsInDate = data.filter(room => room.status !== "inactive");
      } else {
        this.rooms = [];
        this.freeRoomsInDate = [];
      }
      this.setFreeRooms(this.rooms);
    });
  }

  public setFreeRooms(rooms: Array<Room>) {
    if (this.searchStartDate !== "" && this.searchEndDate !== "" && this.searchStartDate !== "1970-01-01" && this.searchEndDate !== "1970-01-01") {
      this.searchDays = this.calculateDays(this.searchStartDate, this.searchEndDate);
      this.freeRoomsInDate = [];
      this.roomService.getAvailableRoomsWithAccomodationIdAndDate(this.accommodationID, this.searchStartDate, this.searchEndDate, this.persons).toPromise().then(data => {
        if (data !== undefined) {
          this.freeRoomsInDate = data.filter(room => room.status !== "inactive");
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

  calculateRoomPrice(room: Room) {
    if (room.pricePerNight !== undefined) {
      return this.searchDays * room.pricePerNight
    }
    return "Price could not be calculated"
  }

  refresh() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const futureDate = new Date();
    futureDate.setFullYear(currentDate.getFullYear() + 1, currentDate.getMonth() + 6, 0);
    let searchStartDate = this.range.get("start")?.value;
    let searchEndDate = this.range.get("end")?.value;
    if (searchStartDate < currentDate || searchEndDate < currentDate || searchStartDate > futureDate || searchEndDate > futureDate) {
      this.errorAlertForIncorrectDate();
    } else {
      this.reopenWithNewDate();
    }
  }

  reopenWithNewDate() {
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

  public errorAlertForIncorrectDate() {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Date!',
      text: 'You cant refresh for empty date or date in the past or date in the future!',
    })
  }

}

