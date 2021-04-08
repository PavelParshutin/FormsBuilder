import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {getIsAuth} from "./store/auth.reducer";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router, private store: Store) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let isAuth = false
    this.store.select(getIsAuth).subscribe(auth => isAuth = auth)
    if(isAuth){
      console.log('guard', isAuth)
      return true
    }else{
      this.router.navigate(['/registration'], {
        queryParams: {
          auth: false
        }
      })
      return false
    }
  }

}
