import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent implements OnInit, OnDestroy {
  stayWithSub: Subscription;
  needQuietSub: Subscription;
  wholeTimeSub: Subscription;
  rentalCarSub: Subscription;
  changedLocationSub: Subscription;

  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.questionnaire = new FormGroup({
      'stayWith': new FormControl(null, Validators.required),
      'needQuiet': new FormControl(null, Validators.required),
      'wholeTime': new FormControl(null, Validators.required),
      'rentalCar': new FormControl(null, Validators.required),
      'changedLocation': new FormControl(null, Validators.required),
      'generalComment': new FormControl(null)
    });

    */
  constructor() { }

  ngOnInit() {
    this.stayWithSub = this.parentForm.get('stayWith').valueChanges.subscribe( val => {
      console.log(val);
    });
    this.needQuietSub = this.parentForm.get('needQuiet').valueChanges.subscribe( val => {
      console.log(val);
    });
    this.wholeTimeSub = this.parentForm.get('wholeTime').valueChanges.subscribe( val => {
      console.log(val);
    });
    this.rentalCarSub = this.parentForm.get('rentalCar').valueChanges.subscribe( val => {
      console.log(val);
    });
    this.changedLocationSub = this.parentForm.get('changedLocation').valueChanges.subscribe( val => {
      console.log(val);
    });
  }

  ngOnDestroy() {
    this.stayWithSub.unsubscribe();
    this.needQuietSub.unsubscribe();
    this.wholeTimeSub.unsubscribe();
    this.rentalCarSub.unsubscribe();
    this.changedLocationSub.unsubscribe();
  }
  

}
