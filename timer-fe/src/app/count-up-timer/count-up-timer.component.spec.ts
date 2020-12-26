import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountUpTimerComponent } from './count-up-timer.component';

describe('CountUpTimerComponent', () => {
  let component: CountUpTimerComponent;
  let fixture: ComponentFixture<CountUpTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountUpTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountUpTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
