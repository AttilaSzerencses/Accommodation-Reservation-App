import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Room } from 'src/app/shared/models/room';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { RoomService } from 'src/app/shared/services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-accommodation-management',
  templateUrl: './accommodation-management.component.html',
  styleUrls: ['./accommodation-management.component.css']
})
export class AccommodationManagementComponent implements OnInit {

  userId: number = Number(localStorage.getItem("userId"))
  accommodations: Accommodation[]
  rooms: Room[]
  toggleStatus: boolean = false;
  constructor(private router: Router, private accommodationService: AccommodationService, private roomService: RoomService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllAccommodationsByPersonId();
    this.getAllRooms();
  }

  public getAllAccommodationsByPersonId() {
    this.accommodationService.getAllAccommodationByPersonId(this.userId).toPromise().then(data => {
      if (data != undefined) {
        this.accommodations = data;
      }
    });
  }

  public getAllRooms() {
    this.roomService.getRooms().toPromise().then(data => {
      if (data != undefined) {
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

  public updateRoom(accommodation: Accommodation, room: Room) {
    window.open(`http://localhost:4200/createRoom?accommodation=${accommodation.id}&room=${room.id}`, '_self');
  }

  public IsIdMatch(accommoditon: Accommodation, room: Room) {
    if (accommoditon === undefined || room === undefined) return false;
    if (accommoditon.id === room.accommodation?.id) {
      return true;
    }
    return false;
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

  changeAccommodationStatus(accommodation: Accommodation){
    let updateAccommodation = accommodation;
    if(accommodation.status === "active"){
      updateAccommodation.status = "inactive"
      this.accommodationService.updateAccommodation(updateAccommodation).toPromise().then(data => {
        this.statusChangeAlert();
      });
    } else {
      updateAccommodation.status = "active"
      this.accommodationService.updateAccommodation(updateAccommodation).subscribe(data => {
        this.statusChangeAlert();
      });
    }
  }

  changeRoomStatus(room: Room){
    let updateRoom = room;
    if(room.status === "active"){
      updateRoom.status = "inactive"
      this.roomService.updateRoom(updateRoom).toPromise().then(data => {
        this.statusChangeAlert();
      });
    } else {
      updateRoom.status = "active"
      this.roomService.updateRoom(updateRoom).subscribe(data => {
        this.statusChangeAlert();
      });
    }
  }

  public errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Unsuccessful deletion!',
      text: "An error has occurred, so you cannot delete the selected item!",
    })
  }

  public succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successful deletion!',
      text: "You have successfully deleted the item!",
      showConfirmButton: false,
      timer: 1500
    })
    window.location.reload();
  }

  public statusChangeAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successful status change!',
      text: "You have successfully change the status!",
      showConfirmButton: false,
      timer: 1000
    })
    this.router.navigate(['/accommodationManagement']);
  }

}
