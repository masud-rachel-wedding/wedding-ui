import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-identify-your-party',
  templateUrl: './identify-your-party.component.html',
  styleUrls: ['./identify-your-party.component.scss']
})
export class IdentifyYourPartyComponent implements OnInit {
  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.identifyYourParty = new FormGroup({
      'identifyGuest': new FormControl("")
    });
    
    */
  
  constructor() { }

  ngOnInit() {
  }

}
