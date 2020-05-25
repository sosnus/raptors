import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import {log} from "util";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    const rolesIDs = route.data.rolesIDs as Array<string>;
    return this.checkLogin(url, rolesIDs);
  }

  checkLogin(url: string, rolesIDs: Array<string>) {
    if (this.authService.userLoggedIn()) {
      if (this.authService.userCanAccessPageWithRoles(rolesIDs)) {
        return true;
      } else {
        this.router.navigate(['/access-denied']);
        return false;
      }
    }

    // Storing attempted URL for redirecting
    this.authService.redirectURL = url;
    // log("niezalogowany");
    this.router.navigate(['/login']);
    return false;
  }

}
