import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private roleService: RoleService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const isAdmin = await this.roleService.isAdmin();
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
