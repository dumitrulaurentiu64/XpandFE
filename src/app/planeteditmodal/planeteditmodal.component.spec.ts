import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneteditmodalComponent } from './planeteditmodal.component';

describe('PlaneteditmodalComponent', () => {
  let component: PlaneteditmodalComponent;
  let fixture: ComponentFixture<PlaneteditmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaneteditmodalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaneteditmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
