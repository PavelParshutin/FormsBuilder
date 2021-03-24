import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';
import {login} from '../../store/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submited = false

  constructor(private auth: AuthService, private store: Store) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit() {
    this.store.dispatch(login());
    // const user: IUser = {
    //   email: this.form.value.email,
    //   password: this.form.value.password
    // }
    //  this.submited = true
    // //this.store.dispatch(new Login(user))
    // this.auth.logIn(user).subscribe(res => {
    //   this.submited = false
    //   console.log(res);
    // })
  }
}
