import { Component, OnInit, Input } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { updateCountryVote } from 'src/app/store/app.actions';

@Component({
  selector: 'app-our-vision',
  templateUrl: './our-vision.component.html',
  styleUrls: ['./our-vision.component.scss']
})
export class OurVisionComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() { }

  castVote(event: MatRadioChange) {
    let payload = {
      countryVote: event.value
    }
    this.store.dispatch( updateCountryVote( payload));
  }

}
