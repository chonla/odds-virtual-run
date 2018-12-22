import { Component, OnInit } from '@angular/core';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStrava } from '@fortawesome/free-brands-svg-icons';
import { VrService } from '../../services/vr.service';
import { Athlete } from 'src/app/models/athlete';
import { AuthService } from 'src/app/services/auth.service';
import { Version } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  me: Athlete;
  version: Version;
  faHome = faHome;
  faStrava = faStrava;
  faSpinner = faSpinner;

  constructor(private vr: VrService, private auth: AuthService) { }

  ngOnInit() {
    this.vr.me().subscribe((data: Athlete) => {
      this.me = data;
    });

    this.vr.version().subscribe((data: Version) => {
      this.version = data;
    });
  }

  signOut() {
    this.auth.signOut();
  }

}
