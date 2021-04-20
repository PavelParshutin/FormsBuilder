import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { loginAction, registrationAction } from '../../store/auth.actions';
import { getIsAuth } from '../../store/auth.reducer';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submited = false;
  bntName: string
  unsubscribe$ = new Subject()

  constructor(private auth: AuthService, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.bntName = this.router.url === '/registration' ? 'Create' : 'Log In'
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    if(this.router.url === '/registration') {
      this.store.dispatch(registrationAction(this.form.value))
    } else {
      this.store.dispatch(loginAction(this.form.value))
    }
    this.store.select(getIsAuth).pipe(
      takeUntil(this.unsubscribe$),
      filter(isAuth => !!isAuth)
    ).subscribe((isAuth: boolean) => this.router.navigate(['/forms']))
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete()
  }


}
