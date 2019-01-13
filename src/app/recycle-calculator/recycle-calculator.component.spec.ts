import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecycleCalculatorComponent } from './recycle-calculator.component';

describe('RecycleCalculatorComponent', () => {
  let component: RecycleCalculatorComponent;
  let fixture: ComponentFixture<RecycleCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecycleCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecycleCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
