import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getPartyMembers } from 'src/app/store/app.selectors';
import { MatRadioButton } from '@angular/material/radio';
import { updatePartyMemberStatus, updatePartyMembersElaboration } from 'src/app/store/app.actions';

@Component({
  selector: 'app-identify-your-party',
  templateUrl: './identify-your-party.component.html',
  styleUrls: ['./identify-your-party.component.scss']
})
export class IdentifyYourPartyComponent implements OnInit, OnDestroy {
  partyMembers$: Observable<string[]>;
  partyMembers: string[] = [];
  partyMembersSub: Subscription;

  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.identifyYourParty = new FormGroup({
      'partyMembersInfo': new FormArray([]),
      'elaborateOnInfo': new FormControl(null)
    });

    */
  
   constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.partyMembers$ = this.store.pipe( select( getPartyMembers ));
    this.partyMembersSub = this.partyMembers$.subscribe( partyMembers => {
      partyMembers.forEach( member => {
        this.partyMembers.push(member);
        const control = new FormControl( null, Validators.required );
        (<FormArray>this.parentForm.get('partyMembersInfo')).push(control);
      });
    });
  }

  getControls() {
    return (this.parentForm.get('partyMembersInfo') as FormArray).controls;
  }

  tableChange(event: MatRadioButton, guestIdx: number) {
    let payload = {
      guestStatus: event.value,
      guestIdx: guestIdx
    }
    this.store.dispatch( updatePartyMemberStatus( payload));
  }

  saveElaboration() {
    let payload = {
      elaboration: this.parentForm.get('elaborateOnInfo').value
    }
    this.store.dispatch( updatePartyMembersElaboration( payload));
  }

  ngOnDestroy() {
    this.partyMembersSub.unsubscribe();
  }
}
