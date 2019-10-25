import { Component, OnInit, Input, OnDestroy, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Observable, Subscription } from 'rxjs';
import { getPartyMembers } from 'src/app/store/app.selectors';
import { MatCheckbox } from '@angular/material';
import {
  updateOptOutPartyMembers,
  updateOptOutElaboration,
  updateOptOutKnowByDate
} from 'src/app/store/app.actions';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-relay-your-conflicts',
  templateUrl: './relay-your-conflicts.component.html',
  styleUrls: ['./relay-your-conflicts.component.scss']
})
export class RelayYourConflictsComponent implements OnInit, OnDestroy {
  unsure: boolean = false;
  unsureForm: FormGroup;
  partyMembers$: Observable<string[]>;
  partyMembersSub: Subscription;
  partySize: number;
  optOutPartyMembersStr: string = '';
  fyi: boolean = false;
  minKnowByDate = new Date();
  minDate = new Date();
  maxDate = new Date(2020, 2, 21);
  knowByDateSub: Subscription;
  calendarHash = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  conflictCount: number = 1;

  @Output() conflictCounter = new EventEmitter<number>();
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
      'elaboration': new FormControl(null),
      'knowByDate': new FormControl(null),
    });
    this.partyMembers$ = this.store.pipe( select( getPartyMembers ));
    this.partyMembersSub = this.partyMembers$.subscribe( party => {
      this.partySize = party.length;
    });
    this.knowByDateSub = this.unsureForm.get('knowByDate').valueChanges.subscribe( date => {
      let dateArray = this.getDateArray(date);
      let payload = {
        knowByDate: dateArray
      }
      this.store.dispatch( updateOptOutKnowByDate( payload));
    })
  }

  getDateArray(date: Date) {
    let dateArray = date.toString().split(' ');
    return [ this.calendarHash[dateArray[1]], dateArray[2], dateArray[3] ];
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

  saveElaboration() {
    let payload = {
      elaboration: this.unsureForm.get('elaboration').value
    }
    this.store.dispatch( updateOptOutElaboration( payload));
  }

  addConflict() {
    const conflictGroup = new FormGroup({
      'partyMembers': new FormControl(null),
      'description': new FormControl(null),
      'startsOnDate': new FormControl(null),
      'endsOnDate': new FormControl(null)
    });
    (<FormArray>this.parentForm.get('conflicts')).push(conflictGroup);
    this.conflictCount = this.conflictCount + 1;
    this.conflictCounter.emit(this.conflictCount);
    console.log((<FormArray>this.parentForm.get('conflicts')).value);
  }

  removeConflict(i: number) {
    (<FormArray>this.parentForm.get('conflicts')).removeAt(i);
    this.conflictCount = this.conflictCount - 1;
    this.conflictCounter.emit(this.conflictCount);
  }

  ngOnDestroy() {
    this.partyMembersSub.unsubscribe();
  }
}
