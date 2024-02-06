import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTransactionStateComponent } from './display-transaction-state.component';

describe('DisplayTransactionStateComponent', () => {
  let component: DisplayTransactionStateComponent;
  let fixture: ComponentFixture<DisplayTransactionStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTransactionStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplayTransactionStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
