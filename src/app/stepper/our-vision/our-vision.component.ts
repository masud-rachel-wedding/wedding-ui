import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-our-vision',
  templateUrl: './our-vision.component.html',
  styleUrls: ['./our-vision.component.scss']
})
export class OurVisionComponent implements OnInit {
  countryVote: string;

  constructor() { }

  ngOnInit() { }

  castVote(event: MatRadioChange) {
    this.countryVote = event.value;
    /* API CALL */
    // Send username and countryVote to BE
  }

}
