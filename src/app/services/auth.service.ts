import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUser} from '../store/interfaces';


@Injectable({
providedIn: 'root'
})
export class AuthService{
  constructor(private http: HttpClient) {
  }

  logIn(user: IUser): Observable<any>{
    return this.http.post('http://localhost:3000/login', user);
  }
}
