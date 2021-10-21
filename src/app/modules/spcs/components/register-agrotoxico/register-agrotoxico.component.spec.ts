import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgrotoxicoComponent } from './register-agrotoxico.component';

describe('RegisterAgrotoxicoComponent', () => {
  let component: RegisterAgrotoxicoComponent;
  let fixture: ComponentFixture<RegisterAgrotoxicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAgrotoxicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAgrotoxicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
