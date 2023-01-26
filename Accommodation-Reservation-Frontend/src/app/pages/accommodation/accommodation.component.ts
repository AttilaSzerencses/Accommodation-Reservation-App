import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Amenity } from 'src/app/shared/models/amenity';
import { Room } from 'src/app/shared/models/room';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  accomodationID: number = 0;
  accommodation: Accommodation;
  amenities: Array<Amenity>;
  rooms: Array<Room>;
  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService) { }

  ngOnInit(): void {
    this.getAccommodationIdFromUrl();
    this.getAccomodationById(this.accomodationID);
  }

  public getAccommodationIdFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.accomodationID = params['accommodation'] || 0;
    })
  }

  public getAccomodationById(accommodationID: number) {
    if (this.accomodationID == 0) {
      this.router.navigate(['/main']);
    }
    this.accommodationService.getAccommodationById(accommodationID).subscribe((data: Accommodation) => {
      this.accommodation = data;
      if(data.amenities !== undefined && data.amenities !== null) {
        this.amenities = data.amenities;
      }
      if (data.rooms !== undefined && data.amenities !== null){
        this.rooms = data.rooms;
      }
    });
  }


}

