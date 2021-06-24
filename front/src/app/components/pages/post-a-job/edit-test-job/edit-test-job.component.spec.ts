import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestJobComponent } from './edit-test-job.component';

describe('EditTestJobComponent', () => {
  let component: EditTestJobComponent;
  let fixture: ComponentFixture<EditTestJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
