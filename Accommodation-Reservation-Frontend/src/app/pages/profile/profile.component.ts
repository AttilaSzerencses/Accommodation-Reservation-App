import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = Number(localStorage.getItem("userId"))
  user: Person;
  updatedPerson: Person;
  showModal = false;
  modalIdentifier = "";
  

  userDetailsForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  })

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    console.log(Number(localStorage.getItem("userId")));
    const person = this.personService.getPersonById(this.userId).subscribe((data: Person) => {
      person.unsubscribe();
      this.user = data;
    })
  }

  toggleModal(identifier: string){
    this.modalIdentifier = identifier;
    this.setFormValues();
    this.showModal = !this.showModal;
  }

  public setFormValues(){
    this.userDetailsForm.get('username')?.setValue(this.user.username);
    this.userDetailsForm.get('email')?.setValue(this.user.email);
  }

  public logOutAfterModification() {
    localStorage.clear(); //If you change username or password or anything you have to login again
    this.router.navigate(['/main'])
  }

  public updateDetails() {
    if(this.modalIdentifier == "personal"){
      this.personUpdate();
      this.toggleModal(this.modalIdentifier);
    } else {
      this.addressUpdate();
      this.toggleModal(this.modalIdentifier);
    }
  }

  public personUpdate() {
    let updatedPerson = this.user;
    let usernameUpdate = false;
    if(this.userDetailsForm.get("username")?.value != this.user.username){
      usernameUpdate = true;
    }
    updatedPerson.username = this.userDetailsForm.get("username")?.value;
    updatedPerson.email = this.userDetailsForm.get("email")?.value;
    this.personService.updatePerson(updatedPerson).subscribe(
      (response: Person) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    if (usernameUpdate){
      this.logOutAfterModification();
    }
    window.location.reload();
  }

  public addressUpdate() {

  }



}
