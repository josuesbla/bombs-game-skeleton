import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BinCounterComponent } from './bin-counter.component';

describe('BinCounterComponent', () => {
  let component: BinCounterComponent;
  let fixture: ComponentFixture<BinCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BinCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BinCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
