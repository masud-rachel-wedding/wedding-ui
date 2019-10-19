import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  showSpinner: boolean = false;
  intervalSubscription: Subscription;

  @Output() loginResult = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  login() {
    let username = this.signInForm.get('username').value;
    let password = this.signInForm.get('password').value;

    /* API CALL */
    // Send username and password to BE
    // Recieve info for the rest of the RSVP stepper

    // While we wait...
    this.showSpinner = true;
    this.intervalSubscription = timer(1000).subscribe( val => {
      this.loginResult.emit(true);
      this.showSpinner = false;
    });

  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }
}
