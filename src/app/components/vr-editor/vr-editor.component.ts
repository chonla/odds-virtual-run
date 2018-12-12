import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VrService } from 'src/app/services/vr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vr-editor',
  templateUrl: './vr-editor.component.html',
  styleUrls: ['./vr-editor.component.scss']
})
export class VrEditorComponent implements OnInit {

  vrForm: FormGroup;

  constructor(private fb: FormBuilder,private vr: VrService,private router: Router) { }

  ngOnInit() {
    this.vrForm = this.fb.group({
      title: ['', Validators.required],
      period: [['', ''], Validators.required],
      detail: ''
    });
  }

  saveForm() {
    if (this.vrForm.valid) {
      this.vr.create(this.vrForm.value).subscribe(result => {
        this.router.navigate(['/vr', result.link]);
      });
    }
    return false;
  }

}
