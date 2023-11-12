import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackEndPhpService } from '../services/back-end-php.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _services:BackEndPhpService,
    private _router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) : Observable<boolean> | boolean {

      if(this._services.returnBackend()) {
        console.log('teste')
        return true
      }

      this._router.navigate(['/'])
      return false
  }
}
