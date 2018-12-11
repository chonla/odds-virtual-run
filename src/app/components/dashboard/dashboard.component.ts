import { Component, OnInit } from '@angular/core';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStrava } from '@fortawesome/free-brands-svg-icons';
import { VrService } from '../../services/vr.service';
import { Athlete } from 'src/app/models/athlete';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  me: Athlete;
  faHome = faHome;
  faStrava = faStrava;
  faSpinner = faSpinner;

  constructor(private vr: VrService) { }

  ngOnInit() {
    this.vr.me().subscribe((data: Athlete) => {
      this.me = data;
    });
  }

}
