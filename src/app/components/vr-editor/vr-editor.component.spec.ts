import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrEditorComponent } from './vr-editor.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/public_api';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('VrEditorComponent', () => {
  let component: VrEditorComponent;
  let fixture: ComponentFixture<VrEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrEditorComponent ],
      imports: [
        BsDatepickerModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VrEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
