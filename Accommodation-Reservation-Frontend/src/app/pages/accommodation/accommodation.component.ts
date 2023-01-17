import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  accomodationID: number = 0;
  accommodation: Accommodation;
  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accomodationID = params['accommodation'] || 0;
    })
    this.getAccomodationById(this.accomodationID);
    console.log(this.accommodation);
    
  }

  public getAccomodationById(accommodationID: number){
    this.accommodationService.getAccommodationById(accommodationID).subscribe((data: Accommodation) => {
      this.accommodation = data;
    });
  }
  

}

