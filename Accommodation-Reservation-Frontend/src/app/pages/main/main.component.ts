import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { RoomService } from 'src/app/shared/services/room.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor(private accommodationService: AccommodationService, private router: Router, private roomService: RoomService, private datePipe: DatePipe) { }

  savedAccommodations: Array<Accommodation> = [];
  accommodations: Array<Accommodation> = [];
  searchText: string = "";
  adults = 1;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations() {
    const allAccomodations = this.accommodationService.getAccommodations().subscribe((data: Accommodation[]) => {
      allAccomodations.unsubscribe();
      const activeAccommodations = data.filter(accommodation => accommodation.status !== 'inactive' && accommodation.status !== 'waiting');
      this.accommodations = activeAccommodations.slice(0, 8);
      this.savedAccommodations = data;
    })
  }

  checkDateAndGetFilteredAccommodations() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const futureDate = new Date();
    futureDate.setFullYear(currentDate.getFullYear() + 1, currentDate.getMonth() + 6, 0);
    let searchStartDate = this.range.get("start")?.value;
    let searchEndDate = this.range.get("end")?.value;
    if(searchStartDate !== null && searchEndDate !== null ){
      if(searchStartDate < currentDate || searchEndDate < currentDate || searchStartDate > futureDate || searchEndDate > futureDate) {
        this.errorAlertForIncorrectDate();
      } else{
        this.getFilteredAccommodations();
      }
    } else {
      this.getFilteredAccommodations();
    }
    
  }

  async getFilteredAccommodations() {
    let filteredAccommodationList: Array<Accommodation> = [];
    let filteredAccommodationListWithDate: Array<Accommodation> = [];
    for (let accommodation of this.savedAccommodations) {
      if(accommodation.status === "inactive" || accommodation.status === "waiting" ) continue
      if (accommodation.name.toLowerCase().includes(this.searchText.toLowerCase()) || accommodation.city.toLowerCase().includes(this.searchText.toLowerCase())) {
        if (accommodation.id == undefined) continue;
        let freeRoomsByCapacityForTheCurrentAccommodation = await this.roomService.getAvailableRoomsByRoomCapacityAndHotelId(accommodation.id, this.adults).toPromise();
        if (freeRoomsByCapacityForTheCurrentAccommodation && freeRoomsByCapacityForTheCurrentAccommodation.length !== 0) {
          filteredAccommodationList.push(accommodation);
        }
      }
    }
    if (this.range.get("start")?.value !== null && this.range.get("end")?.value !== null) {
      let convertedStartDate = this.datePipe.transform(new Date(this.range.get("end")?.value), "yyyy-MM-dd")
      let convertedEndDate = this.datePipe.transform(new Date(this.range.get("end")?.value), "yyyy-MM-dd")
      for (let accommodation of filteredAccommodationList) {
        if (accommodation.id == undefined || accommodation.status == "inactive" || accommodation.status == "waiting") continue;
        if (convertedStartDate === null || convertedEndDate === null) continue;
        let freeRoomsForTheCurrentAccommodation = await this.roomService.getAvailableRoomsWithAccomodationIdAndDate(accommodation.id, convertedStartDate, convertedEndDate, this.adults).toPromise();
        if (freeRoomsForTheCurrentAccommodation && freeRoomsForTheCurrentAccommodation.length !== 0) {
          filteredAccommodationListWithDate.push(accommodation);
        }
      }
      this.accommodations = filteredAccommodationListWithDate;
    } else {
      this.accommodations = filteredAccommodationList;
    }
  }

  public redirectWithAccommodation(accommodation: Accommodation) {
    let convertedStartDate = this.datePipe.transform(new Date(this.range.get("start")?.value), "yyyy-MM-dd")
    let convertedEndDate = this.datePipe.transform(new Date(this.range.get("end")?.value), "yyyy-MM-dd")
    if (convertedStartDate === null || convertedEndDate === null || this.range.get("end")?.value === null){
      convertedStartDate = "";
      convertedEndDate = "";
    }
    window.open(`http://localhost:4200/accommodation?accommodation=${accommodation.id}&persons=${this.adults}&startDate=${convertedStartDate}&endDate=${convertedEndDate}`, '_blank');
  }

  incrementAdults() {
    this.adults++;
  }

  decrementAdults() {
    if (this.adults > 1) this.adults--;
  }

  public errorAlertForIncorrectDate() {
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Date!',
      text: 'You cant search for the date in the past or in the future!',
    })
  }


}
