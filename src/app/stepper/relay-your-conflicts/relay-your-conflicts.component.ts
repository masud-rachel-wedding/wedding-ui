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
  partyMembers$: Observable<string[]>;

  unsure: boolean = false;
  fyi: boolean = false;
  invalidDate: boolean = false;

  partySize: number;
  optOutPartyMembersStr: string = '';
  calendarHash = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' };
  currentDate = new Date();
  minDate = new Date(2020, 6, 1);
  maxDate = new Date(2020, 8, 30);
  errorMessage: string = null;
  errorMessageOptOut: string = null;

  unsureForm: FormGroup;
  partyMembersSub: Subscription;
  knowByDateSub: Subscription;
  conflictsSub: Subscription;

  @Output() invalidForm = new EventEmitter<boolean>();
  @Output() conflictsArray = new EventEmitter<any>();
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
      if(date !== null) {
        let dateArray = this.getDateArray(date);
        let payload = {
          knowByDate: dateArray
        }
        this.store.dispatch( updateOptOutKnowByDate( payload));
      }
    });

    this.conflictsSub = (<FormArray>this.parentForm.get('conflicts')).valueChanges.subscribe( conflicts => {
      this.errorMessage = null;
      for(let i = 0; i < conflicts.length; i++) {
        if(conflicts[i].startsOnDate !== null && conflicts[i].endsOnDate !== null) {
          if(conflicts[i].startsOnDate < this.minDate || conflicts[i].startsOnDate > this.maxDate) {
            this.errorMessage = "The start date given in row " + (i+1) + " is outside the specified timeframe (July - September 2020)."
            this.invalidDate = true;
            this.invalidForm.emit(this.invalidDate);
            break;
          }
          else if(conflicts[i].endsOnDate < this.minDate || conflicts[i].endsOnDate > this.maxDate) {
            this.errorMessage = "The start date given in row " + (i+1) + " is outside the specified timeframe (July - September 2020)."
            this.invalidDate = true;
            this.invalidForm.emit(this.invalidDate);
            break;
          }
          else if(conflicts[i].startsOnDate > conflicts[i].endsOnDate) {
            this.errorMessage = "The end date given in row " + (i+1) + " occurs before the start date.";
            this.invalidDate = true;
            this.invalidForm.emit(this.invalidDate);
            break;
          }
          else {
            this.invalidDate = false;
            this.invalidForm.emit(this.invalidDate);
            this.conflictsArray.emit(conflicts);
          }
        }
        else {
          if(conflicts[i].startsOnDate === null) {
            this.errorMessage = "Don't forget to put a valid start date in row " + (i+1) +"!";
          }
          else {
            this.errorMessage = "Don't forget to put a valid end date in row " + (i+1) +"!";
          }
          this.invalidDate = true;
          this.invalidForm.emit(this.invalidDate);
          break;
        }
      }
    });
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
  }

  removeConflict(i: number) {
    (<FormArray>this.parentForm.get('conflicts')).removeAt(i);
  }

  ngOnDestroy() {
    this.partyMembersSub.unsubscribe();
    this.knowByDateSub.unsubscribe();
    this.conflictsSub.unsubscribe();
  }
}
