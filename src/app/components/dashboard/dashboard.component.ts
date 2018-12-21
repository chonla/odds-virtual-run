import { Component, OnInit } from '@angular/core';
import { faHome, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faStrava } from '@fortawesome/free-brands-svg-icons';
import { VrService } from '../../services/vr.service';
import { Athlete } from 'src/app/models/athlete';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private vr: VrService, private auth: AuthService) { }

  ngOnInit() {
    this.vr.me().subscribe((data: Athlete) => {
      this.me = data;
    });
  }

  signOut() {
    this.auth.signOut();
  }

}
