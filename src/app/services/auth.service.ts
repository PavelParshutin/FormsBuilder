import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {from, observable, Observable, of} from 'rxjs';
import { environment } from '../../environments/environment';
import {AuthResponse, User} from '../store/interfaces';
import * as jwtEncode from 'jwt-encode';
import { catchError, filter, find, first, map, mapTo, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}
  isAuth = false

  logIn(newUser: User): Observable<AuthResponse>{
    console.log('new user', newUser);
    return this.http.post(`${environment.baseUrl}/users`, newUser).pipe(
      map((user: User) => {
          const accessToken = this.createToken(user);
          return {accessToken};
        },
        catchError(
          err => {
            return err;
          }
        )
      ))
  }

  registration(newUser: User): Observable<AuthResponse>{
    return this.http.post(`${environment.baseUrl}/users`, newUser).pipe(
      map((user: User) => {
        this.isAuth = true
          const accessToken = this.createToken(user);
          return {accessToken};
        },
        catchError(
          err => {
            // this.isAuth = false;
            return err;
          }
        )
      ))
  }

  createToken(obj): string
  {
    return jwtEncode(obj, 'secretKey')
  }
}



// registration(newUser: User): Observable<User>{
//     return this.http.post(`${environment.baseUrl}/users`, newUser).pipe(
//       map((user: User) => {
//         const accessToken = this.createToken(user)
//         this.store.dispatch(registrationSuccessAction(accessToken))
//         this.isAuth = true
//         return user
//       },
//         catchError(
//           err => {
//             this.store.dispatch(registrationFailedAction())
//             this.isAuth = false
//             return err
//           }
//         )
//     ))
// }


// logIn(currentUser?): Observable<any> {
//   return this.http.post(`${environment.baseUrl}/users`, currentUser).pipe(
//     map((user: User) => {
//       const accessToken = this.createToken(user)
//       localStorage.setItem('accessToken', accessToken)
//       this.store.dispatch(loginSuccessAction())
//       this.isAuth = true
//       return user
//     }),
//     catchError(err => {
//       this.store.dispatch(loginFailedAction())
//       this.isAuth = false
//       return err
//     })
//   )
// }






// getAllUsers(newUser): Observable<any>{
//   return this.http.get(`${environment.baseUrl}/users`).pipe(switchMap(
//     (usersArray: Observable<User>) => from(usersArray).pipe(
//       find((user: User ) => user.email === newUser.email),
//       tap(user => {
//         if (user) {
//           console.log('exist')
//           return true
//         }
//         console.log('non exist')
//         return false
//       })
//     )))
// }

// registaration(newUser: User): Observable<any> {
//   return this.getAllUsers(newUser).pipe(switchMap(
//     (res) => of(res).pipe(
//         map(result => {
//           if(result){
//             this.store.dispatch(registrationFailedAction())
//             console.log('User with same email already exist')
//             return newUser
//           }
//           this.store.dispatch(registrationSuccessAction())
//           console.log('Registration success')
//           return this.http.post(`${environment.baseUrl}/users`, newUser)
//         } )
//       )
//     ))
// }

// logIn(currentUser?): Observable<any> {
//   return this.getAllUsers(currentUser).pipe(tap(result => {
//     if(result){
//       console.log('email confirmed ')
//       this.store.dispatch(loginSuccessAction())
//       return currentUser
//     }
//     console.log('email not exist')
//     this.store.dispatch(loginFailedAction())
//     return currentUser
//   }))
// }

