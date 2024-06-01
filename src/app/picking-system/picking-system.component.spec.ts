import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingSystemComponent } from './picking-system.component';

describe('PickingSystemComponent', () => {
  let component: PickingSystemComponent;
  let fixture: ComponentFixture<PickingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickingSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
