import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelayYourConflictsComponent } from './relay-your-conflicts.component';

describe('RelayYourConflictsComponent', () => {
  let component: RelayYourConflictsComponent;
  let fixture: ComponentFixture<RelayYourConflictsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelayYourConflictsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelayYourConflictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
