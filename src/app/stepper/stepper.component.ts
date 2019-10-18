import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.firstFormGroup = new FormGroup({
      'firstCtrl': new FormControl("", Validators.required)
    });
    this.secondFormGroup = new FormGroup({
      'secondCtrl': new FormControl("", Validators.required)
    });

    // this.firstFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
    // this.secondFormGroup.valueChanges.subscribe(newVal => console.log(newVal));
  }

  onSubmit(event: any) {
    console.log(event);
    // console.log(this.firstFormGroup.get('firstCtrl'));
  }
}
