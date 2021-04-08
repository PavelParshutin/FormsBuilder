import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';
import { registrationAction } from '../store/auth.actions';
import { getIsAuth } from '../store/auth.reducer';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {
  registrationForm: FormGroup;
  submited = false;

  constructor(private auth: AuthService, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit(): void {
    this.store.dispatch(registrationAction(this.registrationForm.value))
    // const isAuth = this.store.select(getIsAuth)
    // if(isAuth){
    //   this.router.navigate(['/forms'])
    // }
    // this.store.select(getIsAuth).subscribe(isauth => console.log(isauth))
    this.router.navigate(['/forms'])
  }
}
