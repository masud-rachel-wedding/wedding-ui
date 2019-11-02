import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { login } from '../store/app.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  showSpinner: boolean = false;
  loginFail: boolean = false;
  loginError: boolean = false;
  intervalSubscription: Subscription;
  url: string = '';
  error: string = '';

  @Output() loginResult = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>, private http: HttpClient) { }


  ngOnInit() {
    this.signInForm = new FormGroup({
      'code': new FormControl("", Validators.required),
    });
  }

  login() {
    this.showSpinner = true;
    let postData = {
      code: this.signInForm.get('code').value,
    }
    this.http.post<{result: boolean, partyMembers?: string[]}>(this.url, postData).subscribe( response => {
      this.loginError = false;
      this.showSpinner = false;
      if(response.result) {
        this.loginFail = false;
        const payload = {
          code: this.signInForm.get('code').value,
          partyMembers: response.partyMembers
        }
        this.store.dispatch( login(payload));
        this.loginResult.emit(true);
      }
      else {
        this.loginFail = true;
      }
    }, error => {
      console.log(error);
      this.error = error.message;
      this.loginError = true;
    });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }
}
