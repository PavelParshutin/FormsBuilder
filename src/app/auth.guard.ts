import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { getIsAuth } from './store/auth.reducer';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(getIsAuth).pipe(
      map(auth => {
          if(auth){
            console.log('guard', auth)
            return true
          }else{
            this.router.navigate(['/home'], {
              queryParams: {
                auth: false
              }
            })
            return false
          }
        }))
  }

}
