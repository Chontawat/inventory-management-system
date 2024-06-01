import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDataComponent } from './management-data.component';

describe('ManagementDataComponent', () => {
  let component: ManagementDataComponent;
  let fixture: ComponentFixture<ManagementDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
