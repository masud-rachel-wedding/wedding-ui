import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { login } from '../store/app.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  showSpinner: boolean = false;
  intervalSubscription: Subscription;

  @Output() loginResult = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>) { }


  ngOnInit() {
    this.signInForm = new FormGroup({
      'code': new FormControl("", Validators.required),
    });
  }

  login() {
    let payload = {
      code: this.signInForm.get('code').value,
    }

    /* API CALL */
    // Send username and password to BE
    // Recieve info for the rest of the RSVP stepper
    // But in the meantime...
    this.showSpinner = true;
    this.intervalSubscription = timer(1000).subscribe( val => {
      this.store.dispatch( login(payload));
      this.loginResult.emit(true);
      this.showSpinner = false;
    });

  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }
}
