import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'src/app/shared/models/person';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    rePassword: new FormControl()
  });

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  public onRegistration(): void {
    const person: Person = {
      username: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      firstName: " ",
      lastName: " ",
      phone: " "
    };
    this.personService.addPerson(person).subscribe(
      (respone: Person) => {
        console.log(respone);
        this.signUpForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.signUpForm.reset();
      }
    )
  }

}
