import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { Reservation } from 'src/app/shared/models/reservation';
import { Room } from 'src/app/shared/models/room';
import { PersonService } from 'src/app/shared/services/person.service';
import Swal from 'sweetalert2';
import { ReservationService } from 'src/app/shared/services/reservation.service';
import { RoomService } from 'src/app/shared/services/room.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userId: number = Number(localStorage.getItem("userId"));
  user: Person;
  roomId: number;
  room: Room;
  persons: Number;
  startDate: string;
  endDate: string;

  personalDetailsForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    emailAddress: new FormControl(),
    phoneNumber: new FormControl(),
    postCode: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    houseNumber: new FormControl(),
  })

  constructor(private personService: PersonService, private route: ActivatedRoute, private router: Router, private reservationService: ReservationService, private roomService: RoomService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getSentParamsFromUrl();
    this.getRoomById(this.roomId);
  }


  public getCurrentUser() {
    const person = this.personService.getPersonById(this.userId).subscribe((data: Person) => {
      person.unsubscribe();
      this.user = data;
      this.setFormValues();
    })
  }

  public getRoomById(id: number) {
    if (this.roomId == 0) {
      this.router.navigate(['/main']);
    }
    this.roomService.getRoomById(id).subscribe((data: Room) => {
      this.room = data;
    });
  }

  public getSentParamsFromUrl() {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['roomId'] || 0;
      this.persons = params['persons'];
      this.startDate = params['startDate'];
      this.endDate = params['endDate'];
    })
  }

  public setFormValues() {
    this.personalDetailsForm.get('firstName')?.setValue(this.user.firstName);
    this.personalDetailsForm.get('lastName')?.setValue(this.user.lastName);
    this.personalDetailsForm.get('emailAddress')?.setValue(this.user.email);
    this.personalDetailsForm.get('phoneNumber')?.setValue(this.user.phone);
    this.personalDetailsForm.get('postCode')?.setValue(this.user.address?.postCode);
    this.personalDetailsForm.get('city')?.setValue(this.user.address?.city);
    this.personalDetailsForm.get('street')?.setValue(this.user.address?.street);
    this.personalDetailsForm.get('houseNumber')?.setValue(this.user.address?.houseNumber);

  }

  public sendReservation() {
    let booking: Reservation = {
      person: this.user,
      room: this.room,
      checkinDate: this.startDate,
      checkoutDate: this.endDate
    };
    this.reservationService.add(booking).subscribe(
      (response: any) => {
        this.succesAlert();
      },
      (error: HttpErrorResponse) => {
        this.errorAlert();
      }
    );
  }

  public succesAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Successful booking! You will be redirected to the profile page where you can check your reservation!',
      showConfirmButton: false,
      timer: 2000
    })
    this.router.navigate(['/main'])
  }

  public errorAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Error! You have to give every data!",
    })
  }


}
