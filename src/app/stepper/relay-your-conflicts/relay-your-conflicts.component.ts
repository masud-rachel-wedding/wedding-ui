import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { getPartyMembers } from 'src/app/store/app.selectors';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-relay-your-conflicts',
  templateUrl: './relay-your-conflicts.component.html',
  styleUrls: ['./relay-your-conflicts.component.scss']
})
export class RelayYourConflictsComponent implements OnInit {
  unsure: boolean = false;
  unsureForm: FormGroup;
  partyMembers$: Observable<string[]>;
  minDate = new Date(2020, 6, 1);
  maxDate = new Date(2020, 8, 21);

  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.conflictGroup = new FormGroup({
      'partyMembers': new FormControl(null),
      'description': new FormControl(null),
      'startsOnDate': new FormControl(null),
      'endsOnDate': new FormControl(null)
    });
    this.relayConflicts = new FormGroup({
      'conflicts': new FormArray([this.conflictGroup])
    });

    this.parentForm.get('firstCtrl').valueChanges.subscribe(newVal => console.log(newVal));
    */
  
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.unsureForm = new FormGroup({
      'partyMembers': new FormControl(null),
      'description': new FormControl(null),
      'knowByDate': new FormControl(null),
    });
    this.partyMembers$ = this.store.pipe( select( getPartyMembers ));
  }
  
  unsureBoxChange(event: MatCheckbox) {
    this.unsure = event.checked;
  }
}
