import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylePropertyFormComponent } from './style-property-form.component';

describe('StylePropertyFormComponent', () => {
  let component: StylePropertyFormComponent;
  let fixture: ComponentFixture<StylePropertyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylePropertyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylePropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
