import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-our-vision',
  templateUrl: './our-vision.component.html',
  styleUrls: ['./our-vision.component.scss']
})
export class OurVisionComponent implements OnInit {
  @Input() parentForm: FormGroup;
    /* Parent Form:

    this.ourVision = new FormGroup({
      'voteForCountry': new FormControl("")
    });

    this.parentForm.get('firstCtrl').valueChanges.subscribe(newVal => console.log(newVal));
    
    */

  constructor() { }

  ngOnInit() {
  }

}
