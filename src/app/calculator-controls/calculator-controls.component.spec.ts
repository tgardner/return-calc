import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorControlsComponent } from './calculator-controls.component';

describe('CalculatorControlsComponent', () => {
  let component: CalculatorControlsComponent;
  let fixture: ComponentFixture<CalculatorControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
