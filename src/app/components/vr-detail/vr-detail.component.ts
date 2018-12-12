import { Component, OnInit } from '@angular/core';
import { VrService } from 'src/app/services/vr.service';
import { ActivatedRoute } from '@angular/router';
import { Vr } from 'src/app/models/vr';

@Component({
  selector: 'app-vr-detail',
  templateUrl: './vr-detail.component.html',
  styleUrls: ['./vr-detail.component.scss']
})
export class VrDetailComponent implements OnInit {
  vrDetail: Vr;

  constructor(private vr: VrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.vr.get(this.route.snapshot.paramMap.get('id')).subscribe(data => this.vrDetail = data);
  }

}
