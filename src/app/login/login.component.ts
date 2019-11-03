import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { login } from '../store/app.actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*'
  })
};

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

  url: string = 'http://localhost:4000/login/';
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
    this.http.post<{result: boolean, partyMembers?: string[], msg?: string}>(this.url, body, httpOptions).subscribe( response => {
      this.loginError = false;
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
        if(response.msg === 'INVALID_CODE') {
          this.loginMsg = 'Sorry, we don\'t recognize the code you entered. Please try again.';
        }
        if(response.msg === 'ALREADY_SUBMITTED') {
          this.loginMsg = 'Sorry, it looks like you have already submitted your RSVP. Contact Rachel (rachel.laviola@gmail.com) or Masud (mxz087000@gmail.com) if you need to make changes to your submission.';
        }
      }
    }, error => {
      console.log(error);
      this.errorMsg = error.message;
      this.loginError = true;
    });
  }
}
