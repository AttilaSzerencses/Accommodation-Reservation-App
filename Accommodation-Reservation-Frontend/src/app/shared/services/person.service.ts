import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiServerUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public getPersons(): Observable<Person[]>{
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`);
  }

  public addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person);
  }

  public updatePerson(person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);
  }

  public deletePerson(personId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`);
  }

}
