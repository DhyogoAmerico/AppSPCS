import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoDashComponent } from './medico-dash.component';

describe('MedicoDashComponent', () => {
  let component: MedicoDashComponent;
  let fixture: ComponentFixture<MedicoDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
