import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReportComponent } from './goods-report.component';

describe('GoodsReportComponent', () => {
  let component: GoodsReportComponent;
  let fixture: ComponentFixture<GoodsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoodsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoodsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
