import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordBannerComponent } from './record-banner.component';

describe('RecordBannerComponent', () => {
  let component: RecordBannerComponent;
  let fixture: ComponentFixture<RecordBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
