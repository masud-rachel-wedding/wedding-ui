import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { getPartyMembers } from 'src/app/store/app.selectors';
import { MatCheckbox } from '@angular/material';
import { updateOptOutPartyMembers } from 'src/app/store/app.actions';

@Component({
  selector: 'app-relay-your-conflicts',
  templateUrl: './relay-your-conflicts.component.html',
  styleUrls: ['./relay-your-conflicts.component.scss']
})
export class RelayYourConflictsComponent implements OnInit {
  unsure: boolean = false;
  unsureForm: FormGroup;
  partyMembers$: Observable<string[]>;
  partyMembersSub: Subscription;
  partySize: number;
  optOutPartyMembersStr: string = '';
  fyi: boolean = false;
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
    this.partyMembersSub = this.partyMembers$.subscribe( party => {
      this.partySize = party.length;
    })
  }
  
  unsureBoxChange(event: MatCheckbox) {
    this.unsure = event.checked;
  }

  optOutPartyMembers() {
    this.optOutPartyMembersStr = '';
    let payload = {
      optOutPartyMembers: this.unsureForm.get('partyMembers').value
    }
    if (payload.optOutPartyMembers.length < this.partySize && payload.optOutPartyMembers.length !== 0) {
      this.fyi = true;
      if (payload.optOutPartyMembers.length === 1) {
        this.optOutPartyMembersStr = payload.optOutPartyMembers[0];
      }
      else {
        payload.optOutPartyMembers.forEach( (member, index) => {
          if (index === payload.optOutPartyMembers.length - 1) {
            this.optOutPartyMembersStr = this.optOutPartyMembersStr.concat(member);
          }
          else if (index === payload.optOutPartyMembers.length - 2) {
            this.optOutPartyMembersStr = this.optOutPartyMembersStr.concat(member, ' and ');
          }
          else {
            this.optOutPartyMembersStr = this.optOutPartyMembersStr.concat(member, ', ');
          }
        });
      }

    } else {
      this.fyi = false;
    }
    this.store.dispatch( updateOptOutPartyMembers( payload));
  }
}
