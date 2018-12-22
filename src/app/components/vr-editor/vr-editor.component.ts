import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VrService } from 'src/app/services/vr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Vr } from 'src/app/models/vr';

@Component({
  selector: 'app-vr-editor',
  templateUrl: './vr-editor.component.html',
  styleUrls: ['./vr-editor.component.scss']
})
export class VrEditorComponent implements OnInit {

  vrID: string;
  vrDetail: Vr;
  editMode: boolean;
  vrForm: FormGroup;

  constructor(private fb: FormBuilder,private vr: VrService,private router: Router, private route: ActivatedRoute) {
    this.editMode = false;
  }

  ngOnInit() {
    this.vrForm = this.fb.group({
      _id: '',
      title: ['', Validators.required],
      period: [['', ''], Validators.required],
      detail: ''
    });

    if (this.route.snapshot.paramMap.has('id')) {
      this.editMode = true;
      this.vrID = this.route.snapshot.paramMap.get('id');
      this.vr.get(this.vrID).subscribe(data => {
        this.vrDetail = data;

        this.vrForm.setValue({
          _id: this.vrDetail._id,
          title: this.vrDetail.title,
          period: [new Date(this.vrDetail.period[0]), new Date(this.vrDetail.period[1])],
          detail: this.vrDetail.detail
        });

        this.vrForm.markAsPristine();
      });
    }
  }

  saveForm() {
    if (this.vrForm.valid) {
      if (this.editMode) {
        this.vr.update(this.vrID, this.vrForm.value).subscribe(result => {
          this.router.navigate(['/vr', result.link]);
        });
      } else {
        this.vr.create(this.vrForm.value).subscribe(result => {
          this.router.navigate(['/vr', result.link]);
        });
      }
    }
    return false;
  }

}
