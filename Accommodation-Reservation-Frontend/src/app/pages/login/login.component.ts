import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonService } from 'src/app/shared/services/person.service';
import { JwtResponse } from 'src/app/shared/models/jwtResponse';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
  }

  public onLogin() {
    const person: JwtResponse = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };
    this.personService.login(person).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem("token",response.token);
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
      title: 'Successful Login!',
      showConfirmButton: false,
      timer: 500
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
