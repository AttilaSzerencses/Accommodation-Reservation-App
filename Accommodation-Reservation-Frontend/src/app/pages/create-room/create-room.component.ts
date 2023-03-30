import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Accommodation } from 'src/app/shared/models/accommodation';
import { Room } from 'src/app/shared/models/room';
import { HttpErrorResponse } from '@angular/common/http';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { RoomService } from 'src/app/shared/services/room.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  accommodationId: number;
  accommodation: Accommodation;
  roomId: number;
  room: Room;
  image: File;
  createOrUpdate = "Create";
  roomForm = new FormGroup({
    roomName: new FormControl(),
    image: new FormControl(),
    pricePerNight: new FormControl(),
    size: new FormControl(),
    description: new FormControl(),
    bedSize: new FormControl(),
  });

  constructor(private route: ActivatedRoute, private router: Router, private accommodationService: AccommodationService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.getSentParamsFromUrl();
    this.getAccommodation();
    if(this.roomId !== 0){
      this.createOrUpdate = "Update";
      this.getRoom();
    }
  }

  public getSentParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.accommodationId = params['accommodation'] || 0;
      this.roomId = params['room'] || 0;
    })
  }

  public getAccommodation() {
    if (this.accommodationId == 0) {
      this.router.navigate(['/main']);
    }
    this.accommodationService.getAccommodationById(this.accommodationId).toPromise().then(data => {
      if (data != undefined){
        this.accommodation = data;
      }
    });
  }

  public getRoom() {
    this.roomService.getRoomById(this.roomId).toPromise().then(data => {
      if (data != undefined){
        this.room = data;
        this.setFormValues();
      }
    });
  }

  public setFormValues() {
    this.roomForm.get('roomName')?.setValue(this.room.name);
    this.roomForm.get('pricePerNight')?.setValue(this.room.pricePerNight);
    this.roomForm.get('size')?.setValue(this.room.size);
    this.roomForm.get('description')?.setValue(this.room.description);
    this.roomForm.get('bedSize')?.setValue(this.room.bedSize);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }

  saveOrUpdateRoom(){
    if(this.roomId !== 0){
      this.updateRoom();
    } else{
      this.saveRoom();
    }
  }

  saveRoom() {
    if(this.roomForm.valid) {
    let room: Room = {
      name: this.roomForm.get('roomName')?.value,
      pricePerNight: this.roomForm.get('pricePerNight')?.value,
      size: this.roomForm.get('size')?.value,
      bedSize: this.roomForm.get('bedSize')?.value,
      description: this.roomForm.get('description')?.value,
      accommodation: this.accommodation
    };
    this.roomService.addRoom(room, this.image).subscribe(
      (response: any) => {
        this.succesAlert();
      },
      (error: HttpErrorResponse) => {
        this.errorAlert();
      });
    } else {
      this.errorAlert();
    }
  }

  updateRoom() {
    if(this.roomForm.valid) {
      let updatedRoom = this.room;
      updatedRoom.name = this.roomForm.get('roomName')?.value;
      updatedRoom.pricePerNight = this.roomForm.get('pricePerNight')?.value;
      updatedRoom.size = this.roomForm.get('size')?.value;
      updatedRoom.bedSize = this.roomForm.get('bedSize')?.value;
      updatedRoom.description = this.roomForm.get('description')?.value;
      this.roomService.updateRoom(updatedRoom, this.image).subscribe(
        (response: any) => {
          this.succesAlert();
        },
        (error: HttpErrorResponse) => {
          this.errorAlert();
        });
    } else{
      this.errorAlert();
    }
  }

  redirectBackToThePreviousPage() {
    window.history.back();
  }

  public errorAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Something is missing or the given data is incorrect!',
      text: "You have to fill every field and check every data is correct!",
    })
  }

  public succesAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Successfull '+this.createOrUpdate+"!",
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/accommodationManagement'])
  }

}
