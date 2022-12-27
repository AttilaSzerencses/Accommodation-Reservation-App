import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/shared/services/person.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'src/app/shared/models/person';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private personService: PersonService, private router: Router) { }

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
    this.personService.registration(person).subscribe(
      (response: any) => {
        console.log(response);
        this.signUpForm.reset();
        this.succesAlert();
      },
      (error: HttpErrorResponse) => {
        this.errorAlert();
      }
    )
  }

  public succesAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Successful registration! You will be redirected to the main page.',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/main'])
  }

  public errorAlert(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Error! IDE JÖN A HTTP ERROR RESPONSE TEXT",
    })
  }

}
