import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyYourPartyComponent } from './identify-your-party.component';

describe('IdentifyYourPartyComponent', () => {
  let component: IdentifyYourPartyComponent;
  let fixture: ComponentFixture<IdentifyYourPartyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyYourPartyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyYourPartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
