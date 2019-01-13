import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployCalculatorComponent } from './deploy-calculator.component';

describe('DeployCalculatorComponent', () => {
  let component: DeployCalculatorComponent;
  let fixture: ComponentFixture<DeployCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
