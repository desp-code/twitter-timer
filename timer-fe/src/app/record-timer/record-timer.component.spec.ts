import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTimerComponent } from './record-timer.component';

describe('RecordTimerComponent', () => {
  let component: RecordTimerComponent;
  let fixture: ComponentFixture<RecordTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
