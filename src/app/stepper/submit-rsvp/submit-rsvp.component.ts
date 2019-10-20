import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submit-rsvp',
  templateUrl: './submit-rsvp.component.html',
  styleUrls: ['./submit-rsvp.component.scss']
})
export class SubmitRsvpComponent implements OnInit {
  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.rsvpInfo = new FormGroup({
      'done': new FormControl("", Validators.required)
    });

    this.parentForm.get('firstCtrl').valueChanges.subscribe(newVal => console.log(newVal));
    
    */
   
  constructor() { }

  ngOnInit() {
  }

}
