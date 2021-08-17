import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppliesComponent } from './my-applies.component';

describe('MyAppliesComponent', () => {
  let component: MyAppliesComponent;
  let fixture: ComponentFixture<MyAppliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAppliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
