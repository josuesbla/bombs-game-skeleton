import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BombsGameComponent } from './bombs-game.component';

describe('BombsGameComponent', () => {
  let component: BombsGameComponent;
  let fixture: ComponentFixture<BombsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BombsGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BombsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
