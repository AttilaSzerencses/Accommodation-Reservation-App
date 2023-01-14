import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {
  private username: string = "";
  constructor(private route: ActivatedRoute, private personService: PersonService, private router: Router) { }

  ngOnInit(): void {
    this.getUserNameFromUrl();
    this.userActivation(this.username)

  }

  public getUserNameFromUrl() {
    this.route.queryParams.subscribe(queryParam => {
      this.username = queryParam['username'];
    })
  }

  public userActivation(username: string) {
    this.personService.personActivation(username).subscribe(
      (response: any) => {
        console.log(response);
        this.succesAlert();
      },
      (error: HttpErrorResponse) => {
        this.errorAlert();
      }
    )
  }

  public succesAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Successful activation! You will be redirected to the main page in 1 sec.',
      showConfirmButton: false,
      timer: 3000
    })
    setTimeout(() => {
      this.router.navigate(['/main'])
    }, 1000);

  }

  public errorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: "Activation failed! It is possible that the user has already been activated or does not exist. You will be redirected to the main page in 1 sec.",
      timer: 3000
    })
    setTimeout(() => {
      this.router.navigate(['/main'])
    }, 1000);
  }

}
