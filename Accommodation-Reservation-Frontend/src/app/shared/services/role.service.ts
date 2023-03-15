import { Injectable, OnInit } from '@angular/core';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  token = localStorage.getItem("token");
  userId = Number(localStorage.getItem("userId"));
  person: any;
  constructor(private personService: PersonService) { }

  isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.token !== undefined && this.token !== '' && this.token !== null && this.userId !== undefined && this.userId !== 0 && this.userId !== null) {
          this.personService.getPersonById(this.userId).toPromise().then(data => {
            if (data !== undefined) {
              this.person = data;
              resolve(this.person && (this.person.role === 'admin'));
            } else {
              resolve(false);
            }
          }).catch(err => {
            console.error('Error while getting user data:', err);
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }

  isAccommodationProvider(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.token !== undefined && this.token !== '' && this.token !== null && this.userId !== undefined && this.userId !== 0 && this.userId !== null) {
          this.personService.getPersonById(this.userId).toPromise().then(data => {
            if (data !== undefined) {
              this.person = data;
              resolve(this.person && (this.person.role === 'admin' || this.person.role === 'accommodationProvider'));
            } else {
              resolve(false);
            }
          }).catch(err => {
            console.error('Error while getting user data:', err);
            resolve(false);
          });
      } else {
        resolve(false);
      }
    });
  }


}
