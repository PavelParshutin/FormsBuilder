import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../store/interfaces';
import * as jwtEncode from 'jwt-encode';
import { catchError, filter, find, first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { offsetSegment } from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker';
import { Store } from '@ngrx/store';
import { loginFailedAction, loginSuccessAction, registrationFailedAction, registrationSuccessAction } from '../store/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}



  getAllUsers(newUser): Observable<any>{
  return this.http.get(`${environment.baseUrl}/users`).pipe(switchMap(
    (usersArray: Observable<User>) => from(usersArray).pipe(
      find((user: User ) => user.email === newUser.email),
      tap(user => {
        if (user) {
          console.log('exist')
          return true
        }
        console.log('non exist')
        return false
      })
    )))
}

registaration(newUser: User): Observable<any> {
  return this.getAllUsers(newUser).pipe(switchMap(
    (res) => of(res).pipe(
        map(result => {
          if(result){
            this.store.dispatch(registrationFailedAction())
            console.log('User with same email already exist')
            return newUser
          }
          this.store.dispatch(registrationSuccessAction())
          console.log('Registration success')
          return this.http.post(`${environment.baseUrl}/users`, newUser)
        } )
      )
    ))
}

logIn(currentUser?): Observable<any> {
  return this.getAllUsers(currentUser).pipe(tap(result => {
    if(result){
      console.log('email confirmed ')
      this.store.dispatch(loginSuccessAction())
      return currentUser
    }
    console.log('email not exist')
    this.store.dispatch(loginFailedAction())
    return currentUser
  }))
}

  cteateToken (obj)
  {
    return jwtEncode(obj, 'secret')
  }
}









// registaration(newUser: User): Observable<any> {
//   return this.getAllUsers().pipe(switchMap(
//     (usersArray) => from(usersArray).pipe(
//       find((user: User ) => user.email === newUser.email),
//       tap(user => {
//         console.log(newUser)
//         if (user) {
//           this.store.dispatch(registrationFailedAction())
//           console.log('User with same email already exist')
//           return user
//         }
//         this.store.dispatch(registrationSuccessAction())
//         console.log('Registration success')
//         return this.registaration2(newUser)
//       })
//     )))
// }
//
// getAllUsers(): Observable<any>{
//   return this.http.get(`${environment.baseUrl}/users`)
// }
//
// logIn(): Observable<any> {
//   return this.getAllUsers().pipe(switchMap())
// }
