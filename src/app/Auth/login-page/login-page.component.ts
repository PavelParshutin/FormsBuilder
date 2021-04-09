import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import {loginAction} from "../../store/auth.actions";
import {Router} from "@angular/router";
import {getIsAuth} from "../../store/auth.reducer";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  submited = false;

  constructor(private auth: AuthService, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    this.store.dispatch(loginAction(this.form.value))
    const isAuth = this.store.select(getIsAuth)
    isAuth.subscribe(res => {
      console.log('res login',res)
      if(res){
        this.router.navigate(['/forms'])
      }
      return
    })
  }
}
