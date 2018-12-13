import { Component, OnInit } from '@angular/core';
import { VrService } from 'src/app/services/vr.service';
import { ActivatedRoute } from '@angular/router';
import { Vr } from 'src/app/models/vr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PositiveNumberValidator } from 'src/app/validators/positive-number.validator';

@Component({
  selector: 'app-vr-detail',
  templateUrl: './vr-detail.component.html',
  styleUrls: ['./vr-detail.component.scss']
})
export class VrDetailComponent implements OnInit {
  joinForm: FormGroup;
  vrDetail: Vr;
  vrID: string;

  constructor(private vr: VrService, private route: ActivatedRoute, private fb:FormBuilder) { }

  ngOnInit() {
    this.vrID = this.route.snapshot.paramMap.get('id');
    this.loadVr();

    this.joinForm = this.fb.group({
      distance: ['0', PositiveNumberValidator.Positive]
    })
  }

  loadVr() {
    this.vr.get(this.vrID).subscribe(data => this.vrDetail = data);
  }

  join() {
    if (this.joinForm.valid) {
      this.vr.join(this.vrDetail.link, this.joinForm.value).subscribe(result => {
        this.loadVr();
      });
    }
    return false;
  }

}
