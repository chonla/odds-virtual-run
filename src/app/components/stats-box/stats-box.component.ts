import { Component, OnInit, Input } from '@angular/core';
import { Athlete } from 'src/app/models/athlete';

@Component({
  selector: 'app-stats-box',
  templateUrl: './stats-box.component.html',
  styleUrls: ['./stats-box.component.scss']
})
export class StatsBoxComponent implements OnInit {
  @Input() profile: Athlete;

  constructor() { }

  ngOnInit() {
  }

}
