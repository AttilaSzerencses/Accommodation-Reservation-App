import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/models/address';
import { AddressService } from 'src/app/shared/services/address.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = Number(localStorage.getItem("userId"))
  user: Person;
  role: string;
  updatedPerson: Person;
  showModal = false;
  modalIdentifier = "";
  

  userDetailsForm = new FormGroup({
    username: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  })

  addressForm = new FormGroup({
    postCode: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    houseNumber: new FormControl(),
  })

  constructor(private personService: PersonService, private addressService: AddressService, private router: Router) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    const person = this.personService.getPersonById(this.userId).subscribe((data: Person) => {
      person.unsubscribe();
      this.user = data;
    })
  }

  public isAdmin() {
    if(this.user.role === "admin"){
      return true;
    } else {
      return false;
    }
  }

  toggleModal(identifier: string){
    this.modalIdentifier = identifier;
    this.setFormValues();
    this.showModal = !this.showModal;
  }

  public setFormValues(){
    this.userDetailsForm.get('username')?.setValue(this.user.username);
    this.userDetailsForm.get('firstName')?.setValue(this.user.firstName);
    this.userDetailsForm.get('lastName')?.setValue(this.user.lastName);
    this.userDetailsForm.get('email')?.setValue(this.user.email);
    this.userDetailsForm.get('phone')?.setValue(this.user.phone);
    
    this.addressForm.get('postCode')?.setValue(this.user.address?.postCode);
    this.addressForm.get('city')?.setValue(this.user.address?.city);
    this.addressForm.get('street')?.setValue(this.user.address?.street);
    this.addressForm.get('houseNumber')?.setValue(this.user.address?.houseNumber);
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
    updatedPerson.firstName = this.userDetailsForm.get("firstName")?.value;
    updatedPerson.lastName = this.userDetailsForm.get("lastName")?.value;
    updatedPerson.email = this.userDetailsForm.get("email")?.value;
    updatedPerson.phone = this.userDetailsForm.get("phone")?.value;
    
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
  }

  public addressUpdate() { 
    let updatedPerson = this.user;
    if(updatedPerson.address !== undefined && updatedPerson.address !== null){
      updatedPerson.address.postCode = this.addressForm.get("postCode")?.value;
      updatedPerson.address.city = this.addressForm.get("city")?.value;
      updatedPerson.address.street = this.addressForm.get("street")?.value;
      updatedPerson.address.houseNumber = this.addressForm.get("houseNumber")?.value;
    } else {
      let updatedAddress: Address = {
        postCode: this.addressForm.get("postCode")?.value,
        city: this.addressForm.get("city")?.value,
        street: this.addressForm.get("street")?.value,
        houseNumber: this.addressForm.get("houseNumber")?.value
      }
      updatedPerson.address = updatedAddress;
    }
    
    this.personService.updatePerson(updatedPerson).subscribe(
      (response: Person) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
    

  }



}
