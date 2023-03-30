import { Component, OnInit } from '@angular/core';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Room } from 'src/app/shared/models/room';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  accommodationsWithWaitingStatus: Array<Accommodation>
  rooms: Array<Room>;


  constructor(private accommodationService: AccommodationService, private roomService: RoomService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getAllAccommodationsWithWaitingStatus();
    this.getAllRooms();
  }

  getAllAccommodationsWithWaitingStatus() {
    this.accommodationService.getAllAccommodationByStatus("waiting").toPromise().then(data => {
      if (data != undefined) {
        this.accommodationsWithWaitingStatus = data;
      }
    });
    /*this.accommodationService.getAccommodations().toPromise().then(data => {
      if (data != undefined) {
        this.accommodationsWithWaitingStatus = data.sort((a, b) => {
          if (a.status === 'waiting' && b.status !== 'waiting') {
            return -1; // a should come before b
          } else if (b.status === 'waiting' && a.status !== 'waiting') {
            return 1; // b should come before a
          } else {
            return 0; // order doesn't matter
          }
        });
      }
    });*/ //IF I WANT TO LIST ALL THE ACCOMMODATIONS I HAVE TO USE THIS
  }

  public getAllRooms() {
    this.roomService.getRooms().toPromise().then(data => {
      if (data != undefined) {
        this.rooms = data;
      }
    });
  }

  activateAccommodation(accommodation: Accommodation) {
    let updateAccommodation = accommodation;
    updateAccommodation.status = "active";
    this.accommodationService.updateAccommodation(updateAccommodation).toPromise().then(data => {
      this.succesAlert();
    }, error => {
      this.errorAlert();
    });
  }

    public IsIdMatch(accommoditon: Accommodation, room: Room) {
    if (accommoditon === undefined || room === undefined) return false;
    if (accommoditon.id === room.accommodation?.id) {
      return true;
    }
    return false;
  }

  public updateAccommodation(accommodation: Accommodation) {
    window.open(`http://localhost:4200/createAccommodation?accommodation=${accommodation.id}`, '_self');
  }

  public updateRoom(accommodation: Accommodation, room: Room) {
    window.open(`http://localhost:4200/createRoom?accommodation=${accommodation.id}&room=${room.id}`, '_self');
  }

  deleteItem(accommodation: Accommodation, room?: Room): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Delete item', message: 'Are you sure you want to delete this item?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (room?.id !== undefined) {
          this.roomService.deleteRoomById(room.id).subscribe(data => {
            this.succesAlert();
          }, error => {
            this.errorAlert();
          });
        } else if (accommodation.id !== undefined) {
          this.accommodationService.deleteAccommodationById(accommodation.id).subscribe(data => {
            this.succesAlert();
          }, error => {
            this.errorAlert();
          });
        }
      }
    });
  }

  public errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Unsuccessful activation!',
      text: "An error has occurred, so you cannot activate the selected accommodation!",
    })
  }

  public succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successful activation!',
      text: "You have successfully activate the accommodation!",
      showConfirmButton: false,
      timer: 1500
    })
    window.location.reload();
  }

}
