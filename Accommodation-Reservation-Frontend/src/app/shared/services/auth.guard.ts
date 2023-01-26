import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private personService: PersonService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.personService.isLoggedIn()){
        if(route.routeConfig?.path == 'login' || route.routeConfig?.path == 'registration'){
          this.router.navigate(['']);
          return false;
        }
        return true;
      } else {
        if(route.routeConfig?.path == 'login' || route.routeConfig?.path == 'registration'){
          return true;
        } else {
          this.router.navigate(['']);
          return false;
        }
      }
  }
  
}
