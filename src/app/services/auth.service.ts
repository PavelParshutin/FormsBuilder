import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../login-page/interfaces';

@Injectable({
providedIn: 'root'
})
export class AuthService{
  constructor(private http: HttpClient) {
  }

  logIn(user: User): Observable<any>{
    return this.http.post('http://localhost:3000/login', user);
  }
}
