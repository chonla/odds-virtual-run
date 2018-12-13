import { Component, OnInit } from '@angular/core';
import { Vr } from '../../models/vr';
import { VrService } from 'src/app/services/vr.service';

@Component({
  selector: 'app-vr-list',
  templateUrl: './vr-list.component.html',
  styleUrls: ['./vr-list.component.scss']
})
export class VrListComponent implements OnInit {
  vrList: Vr[];

  constructor(private vr: VrService) { }

  ngOnInit() {
    this.vr.available().subscribe(data => this.vrList = data);
  }

}
