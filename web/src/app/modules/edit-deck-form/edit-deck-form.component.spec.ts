import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeckFormComponent } from './edit-deck-form.component';

describe('EditDeckFormComponent', () => {
  let component: EditDeckFormComponent;
  let fixture: ComponentFixture<EditDeckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDeckFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDeckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
