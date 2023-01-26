import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  constructor(private accommodationService: AccommodationService, private router: Router) { }

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

  onSearchTextChanged(){
    this.getFilteredAccommodations();
  }

  getAccommodations() {
    const allAccomodations = this.accommodationService.getAccommodations().subscribe((data: Accommodation[]) => {
      allAccomodations.unsubscribe();
      this.accommodations=data;
      this.savedAccommodations = data;
    })
  }

  getFilteredAccommodations() {
    let filteredAccommodationList: Array<Accommodation> = [];
    for (let accommodation of this.savedAccommodations){
      if (accommodation.name.toLowerCase().includes(this.searchText.toLowerCase()) || accommodation.city.toLowerCase().includes(this.searchText.toLowerCase())){
        filteredAccommodationList.push(accommodation);
      }
    }
    if (filteredAccommodationList.length == 0){
      this.accommodations= [];
    } else {
      this.accommodations = filteredAccommodationList;
    } 
  }

  public redirectWithAccommodation(accommodation: Accommodation) {
    this.router.navigate(['/accommodation'], { queryParams: { accommodation: accommodation.id}});
  }

  incrementAdults() {
    this.adults++;
  }

  decrementAdults() {
    if (this.adults > 1) {
      this.adults--;
    }
  }

}
