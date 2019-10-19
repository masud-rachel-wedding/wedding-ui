import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  loggedIn = false;

  constructor() { }

  ngOnInit() { }

  login(loginResult: boolean) {
    this.loggedIn = loginResult;
  }
}
