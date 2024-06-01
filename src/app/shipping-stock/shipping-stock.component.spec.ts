import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStockComponent } from './shipping-stock.component';

describe('ShippingStockComponent', () => {
  let component: ShippingStockComponent;
  let fixture: ComponentFixture<ShippingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
