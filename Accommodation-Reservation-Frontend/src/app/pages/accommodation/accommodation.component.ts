import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Amenity } from 'src/app/shared/models/amenity';
import { Room } from 'src/app/shared/models/room';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-accommodation',
  templateUrl: './accommodation.component.html',
  styleUrls: ['./accommodation.component.css']
})
export class AccommodationComponent implements OnInit {
  accommodationID: number = 0;
  persons: number = 0;
  searchStartDate: string;
  searchEndDate: string;
  accommodation: Accommodation;
  amenities: Array<Amenity>;
  rooms: Array<Room>;
  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.getSentParamsFromUrl();
    this.getAccomodationById(this.accommodationID);
    this.getRoomsById(this.accommodationID)
  }

  public getSentParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.accommodationID = params['accommodation'] || 0;
      this.persons = params['persons'];
      this.searchStartDate = params['startDate'];
      this.searchEndDate = params['endDate'];
    })
  }


  public getAccomodationById(accommodationID: number) {
    if (this.accommodationID == 0) {
      this.router.navigate(['/main']);
    }
    this.accommodationService.getAccommodationById(accommodationID).subscribe((data: Accommodation) => {
      this.accommodation = data;
      if(data.amenities !== undefined && data.amenities !== null) {
        this.amenities = data.amenities;
      }
    });
  }

  public getRoomsById(accommodationId: number) {
    if (this.accommodationID == 0) {
      this.router.navigate(['/main']);
    }
    this.roomService.getRoomsByAccommodationId(accommodationId).subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }

  public forwardToReservation(room: Room) {
    //TODO: I HAVE TO CHANGE IT TO QUERYSTRING OR ANYTHING ELSE! DON't PUT THE VARIABLES INTO THE URL!
    window.open(`http://localhost:4200/reservation?roomId=${room?.id}&persons=${this.persons}&startDate=${this.searchStartDate}&endDate=${this.searchEndDate}`);
  }


}

