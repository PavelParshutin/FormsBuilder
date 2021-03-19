import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {IUser} from '../../store/interfaces';
import {Store} from '@ngrx/store';
import {Login} from '../../store/actions/login.actions';
import {State} from '../../store/reducers/auth.reducer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submited = false

  constructor(private auth: AuthService, private store:Store<State>) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit() {
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }
     this.submited = true
    //this.store.dispatch(new Login(user))
    this.auth.logIn(user).subscribe(res => {
      this.submited = false
      console.log(res);
    })
  }
}
