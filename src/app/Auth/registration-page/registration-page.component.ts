import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import { registrationAction } from '../../store/auth.actions';
import { getIsAuthSelector } from '../../store/auth.reducer';


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
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
    const isAuth = this.store.select(getIsAuthSelector)
    isAuth.subscribe(res => {
      console.log('res registr', res)
      if(res){
        this.router.navigate(['/forms'])
      }
      return
    })
  }
}
