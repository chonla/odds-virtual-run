import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faStrava } from '@fortawesome/free-brands-svg-icons';
import { VrService } from '../../services/vr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  faHome = faHome;
  faStrava = faStrava;

  constructor(private vr: VrService) { }

  ngOnInit() {
    // this.vr.me().subscribe(data => {
    //   console.log(data);
    // });
  }

}
