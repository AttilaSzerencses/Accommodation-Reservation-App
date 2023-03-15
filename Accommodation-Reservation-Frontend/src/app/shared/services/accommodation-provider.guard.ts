import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class AccommodationProviderGuard implements CanActivate {

  constructor (private roleService: RoleService, private router: Router) {}

 async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const isAccommodationProvider = await this.roleService.isAccommodationProvider();
      const isAdmin = await this.roleService.isAdmin();
       if(isAccommodationProvider || isAdmin){
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
  }
  
}
