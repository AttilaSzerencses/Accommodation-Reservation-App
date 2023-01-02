import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersonService } from '../services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor( private personService: PersonService, private router: Router) { }

  showMenu  = true;

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  public isAuthenticated(){
    return this.personService.isLoggedIn();
  }

  public logout(){
    localStorage.clear();
  }

}
