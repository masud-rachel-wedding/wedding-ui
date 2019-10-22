import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable } from 'rxjs';
import { getPartyMembers } from 'src/app/store/app.selectors';

@Component({
  selector: 'app-relay-your-conflicts',
  templateUrl: './relay-your-conflicts.component.html',
  styleUrls: ['./relay-your-conflicts.component.scss']
})
export class RelayYourConflictsComponent implements OnInit {
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
    this.partyMembers$ = this.store.pipe( select( getPartyMembers ));
  }

}
