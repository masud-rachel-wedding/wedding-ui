import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { login } from '../store/app.actions';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;

  showSpinner: boolean = false;
  loginFail: boolean = true;
  loginError: boolean = false;

  // url: string = 'http://ec2-3-88-85-49.compute-1.amazonaws.com:4000/login/';
  url: string = 'http://localhost:4000/login';
  errorMsg: string = '';
  loginMsg: string = '';

  @Output() loginResult = new EventEmitter<boolean>();

  constructor(private store: Store<AppState>, private http: HttpClient) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'code': new FormControl("", Validators.required),
    });
  }

  login() {
    this.showSpinner = true;
    const loginCode = this.signInForm.get('code').value;
    let body = {
      code: loginCode
    }
    this.http.post<{result: boolean, partyMembers?: string[], message?: string; error?: any}>(this.url, body).subscribe( response => {
      this.loginError = false;
      this.loginFail = false;
      this.showSpinner = false;
      if(response.result) {
        this.loginFail = false;
        const payload = {
          code: loginCode,
          partyMembers: response.partyMembers
        }
        this.store.dispatch( login(payload));
        this.loginResult.emit(true);
      }
      else {
        this.loginFail = true;
        if(response.message === 'INVALID_CODE') {
          this.loginMsg = 'Sorry, we don\'t recognize the code you entered. Please try again.';
        }
        if(response.message === 'ALREADY_SUBMITTED') {
          this.loginMsg = 'Sorry, it looks like you have already submitted your RSVP. Contact Rachel (rachel.laviola@gmail.com) or Masud (mxz087000@gmail.com) if you need to make changes to your submission.';
        }
        if(response.message === 'ERROR') {
          this.loginMsg = 'Sorry, an unknown error has occurred.';
          console.log(response.error);
        }
      }
    }, error => {
      this.loginError = true;
      this.loginFail = false;
      this.errorMsg = error.error.message;
      this.showSpinner = false;
    });
  }
}
