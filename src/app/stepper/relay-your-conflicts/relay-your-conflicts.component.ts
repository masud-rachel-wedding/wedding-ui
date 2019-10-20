import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-relay-your-conflicts',
  templateUrl: './relay-your-conflicts.component.html',
  styleUrls: ['./relay-your-conflicts.component.scss']
})
export class RelayYourConflictsComponent implements OnInit {
  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.relayConflicts = new FormGroup({
      'conflict': new FormControl("", Validators.required)
    });

    this.parentForm.get('firstCtrl').valueChanges.subscribe(newVal => console.log(newVal));
    
    */
  constructor() { }

  ngOnInit() {
  }

}
