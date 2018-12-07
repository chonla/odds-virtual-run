import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrListComponent } from './vr-list.component';

describe('VrListComponent', () => {
  let component: VrListComponent;
  let fixture: ComponentFixture<VrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
