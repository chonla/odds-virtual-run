import { Component, OnInit } from '@angular/core';
import { faHome, faSpinner, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faStrava } from '@fortawesome/free-brands-svg-icons';
import { VrService } from '../../services/vr.service';
import { Athlete } from 'src/app/models/athlete';
import { AuthService } from 'src/app/services/auth.service';
import { Version } from 'src/app/models/version';
import { version } from 'src/environments/version';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  me: Athlete;
  buildNum: string;
  faHome = faHome;
  faStrava = faStrava;
  faSpinner = faSpinner;
  faPlus = faPlus;
  faSignOutAlt = faSignOutAlt;

  constructor(private vr: VrService, private auth: AuthService) { }

  ngOnInit() {
    this.vr.me().subscribe((data: Athlete) => {
      this.me = data;
    });

    // this.me = {"id":5709162,"username":"chonla","firstname":"Chonlasith","lastname":"Jucksriporn","city":"Bang Yo","state":"Samut Prakan","country":"Thailand","sex":"M","profile":"https://graph.facebook.com/1314857181/picture?height=256\u0026width=256","profile_medium":"https://graph.facebook.com/1314857181/picture?height=256\u0026width=256","email":"","stats":{"recent":{"distance":10142.2,"elapsed_time":4422,"moving_time":4153,"title":"Evening Run","start_date":"2019-01-16T12:47:15Z","utc_offset":25200},"recent_run_totals":{"count":0,"distance":0,"moving_time":0,"elapsed_time":0,"elevation_gain":0},"all_run_totals":{"count":0,"distance":0,"moving_time":0,"elapsed_time":0,"elevation_gain":0},"this_month_run_totals":{"count":10,"distance":100134.1,"moving_time":38707,"elapsed_time":40251,"elevation_gain":990.4},"this_year_run_totals":{"count":10,"distance":100134.1,"moving_time":38707,"elapsed_time":40251,"elevation_gain":990.4}}};

    this.vr.version().subscribe((data: Version) => {
      this.buildNum = `${version.version}-${data.version}`;
    });
  }

  signOut() {
    this.auth.signOut();
  }

}
