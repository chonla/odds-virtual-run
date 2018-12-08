import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VrEditorComponent } from './vr-editor.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuillModule } from 'ngx-quill';

describe('VrEditorComponent', () => {
  let component: VrEditorComponent;
  let fixture: ComponentFixture<VrEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VrEditorComponent ],
      imports: [
        BsDatepickerModule.forRoot(),
        QuillModule
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
