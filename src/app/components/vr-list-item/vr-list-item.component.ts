import { Component, OnInit, Input } from '@angular/core';
import { Vr } from 'src/app/models/vr';
import { faRunning } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vr-list-item',
  templateUrl: './vr-list-item.component.html',
  styleUrls: ['./vr-list-item.component.scss']
})
export class VrListItemComponent implements OnInit {
  faRunning = faRunning;
  @Input() vr: Vr;
  over:boolean;

  constructor() {
    this.over = false;
  }

  ngOnInit() {
    const periodEnd = new Date(this.vr.period[1]);
    const end = new Date(periodEnd.getFullYear(), periodEnd.getMonth(), periodEnd.getDate(), 23, 59, 59, 999);
    const today = new Date();
    this.over = (end < today);
  }

}
