import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfermeiroDashComponent } from './enfermeiro-dash.component';

describe('EnfermeiroDashComponent', () => {
  let component: EnfermeiroDashComponent;
  let fixture: ComponentFixture<EnfermeiroDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfermeiroDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermeiroDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
