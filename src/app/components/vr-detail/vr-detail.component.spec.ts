import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrDetailComponent } from './vr-detail.component';

describe('VrDetailComponent', () => {
  let component: VrDetailComponent;
  let fixture: ComponentFixture<VrDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
