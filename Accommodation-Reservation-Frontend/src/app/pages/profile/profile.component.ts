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
  username = "";
  declare user: Person;

  userDetailsForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
  })

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  public getCurrentUser(){
      console.log(Number(localStorage.getItem("userId")));
      const person = this.personService.getPersonById(this.userId).subscribe((data: Person) => {
      person.unsubscribe();
      this.user = data;
    }) 
  }

  public updateUserDetails() {
    let updatedPerson = this.user;
    updatedPerson.username = this.userDetailsForm.get("username")?.value;
    /*if(updatedPerson.password !== this.userDetailsForm.get("password")?.value){
      updatedPerson.password = this.userDetailsForm.get("password")?.value;
    }*/
    updatedPerson.email = this.userDetailsForm.get("email")?.value;
    console.log(updatedPerson.username);
    console.log(updatedPerson.email);
    console.log(updatedPerson.password);
    
    this.personService.updatePerson(updatedPerson).subscribe(
      (response: Person) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    localStorage.clear(); //If you change username or password or anything you have to login again
    this.router.navigate(['/main'])
  }

}
