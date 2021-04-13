import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralStyleComponent } from './general-style.component';

describe('GeneralStyleComponent', () => {
  let component: GeneralStyleComponent;
  let fixture: ComponentFixture<GeneralStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralStyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
