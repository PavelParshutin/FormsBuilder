import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registartion-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistartionPageComponent implements OnInit {
  registrationForm: FormGroup;
  submited = false;

  constructor(private auth: AuthService, private store: Store) {
  }

  ngOnInit(): void {
    const id = Math.floor((Math.random() * 100000) + 1);
    this.registrationForm = new FormGroup({
      id: new FormControl(id),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    });
  }

  onSubmit() {
     this.auth.registaration(this.registrationForm.value).subscribe(res => console.log('reg', res))

    //this.auth.logIn()
  }
}
