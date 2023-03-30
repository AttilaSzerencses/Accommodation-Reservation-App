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

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  })

  passwordhidden: boolean = false;

  public onLogin() {
    if(this.loginForm.get("username")?.value === undefined || this.loginForm.get("password")?.value === ""){
      this.errorAlert("The username and password field cannot be empty!");
      return;
    }
    const person: JwtResponse = {
      username: this.loginForm.get("username")?.value,
      password: this.loginForm.get("password")?.value,
    };
    this.personService.login(person).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem("userId",response.person.id);
        localStorage.setItem("token", response.token);
        this.succesAlert();
      },
      (error: HttpErrorResponse) => {
        this.errorAlert();
      }
    )
  }

  public hidePassword(){
    this.passwordhidden = !this.passwordhidden;
  }

  public succesAlert(){
    Swal.fire({
      icon: 'success',
      title: 'Successful Login!',
      showConfirmButton: false,
      timer: 500
    })
    this.router.navigate(['/main'])
    window.location.reload();
  }

  public errorAlert(msg?: string){
    if(msg != null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Username or password is incorrect!",
      })
    }
    
  }

}
