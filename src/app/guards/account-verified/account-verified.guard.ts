import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user-model';
import { RouteService } from 'src/app/services/route-service/route.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountVerifiedGuard implements CanActivate {
  constructor(
    private route: RouteService,
    private tokenStorageService: TokenStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const currentUser = this.tokenStorageService.getUser() as User;
    if (currentUser && currentUser.role) {
      if (currentUser.isBlocked) {
        return true;
      }
      this.route.redirectTo(`/pages/coach/${currentUser.role.toLowerCase()}`);
      // this.route.back()
      return false;
    }

    return false;
  }
}
