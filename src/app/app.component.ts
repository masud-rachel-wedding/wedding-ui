import { Component, OnInit } from "@angular/core";

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
