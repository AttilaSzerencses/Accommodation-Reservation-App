import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment';
import { JwtResponse } from '../models/jwtResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiServerUrl = environment.apiBaseUrl;
  //requestHeader = new HttpHeaders({"No-Auth":"True"});

  constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`);
  }

  public getPersonById(personId: number): Observable<Person>{
    return this.http.get<Person>(`${this.apiServerUrl}/person/findById/${personId}`);
  }

  public registration(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/person/registration`, person);
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
  }

  public deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`);
  }

  public login(jwtResponse: JwtResponse): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiServerUrl}/authenticate`, jwtResponse); //, {headers: this.requestHeader}
  }

  public isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token == undefined || token === '' || token == null){
      return false;
    } else {
      return true;
    }
  }



}
