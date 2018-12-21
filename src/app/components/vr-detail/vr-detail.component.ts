import { Component, OnInit } from '@angular/core';
import { VrService } from 'src/app/services/vr.service';
import { ActivatedRoute } from '@angular/router';
import { Vr, Engagement } from 'src/app/models/vr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PositiveNumberValidator } from 'src/app/validators/positive-number.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vr-detail',
  templateUrl: './vr-detail.component.html',
  styleUrls: ['./vr-detail.component.scss']
})
export class VrDetailComponent implements OnInit {
  joinForm: FormGroup;
  vrDetail: Vr;
  vrID: string;
  joined: boolean;
  joining: boolean;
  engagement: Engagement;
  percentCompleted: number;
  completed: boolean;

  constructor(private vr: VrService, private auth: AuthService, private route: ActivatedRoute, private fb:FormBuilder) { }

  ngOnInit() {
    this.vrID = this.route.snapshot.paramMap.get('id');
    this.loadVr();

    this.joinForm = this.fb.group({
      distance: ['0', PositiveNumberValidator.Positive]
    })
  }

  loadVr() {
    const myid = this.auth.whoami();
    this.vr.get(this.vrID).subscribe(data => {
      this.vrDetail = data;
      this.vrDetail.engagements.map((o: Engagement) => {
        o.percent_complete = Math.floor(((o.taken_distance / 1000.0) * 100.0 / o.distance) * 100.0) / 100.0;
        if (o.percent_complete > 100.0) {
          o.percent_complete = 100.0;
        }
      });
      const myEngagement = this.vrDetail.engagements.filter((o:Engagement) => {
        return `${o.athlete_id}` === myid;
      });
      this.joined = (myEngagement.length > 0);
      if (this.joined) {
        this.engagement = myEngagement[0];
        this.percentCompleted = this.engagement.percent_complete;
        this.completed = (this.engagement.taken_distance / 1000.0) >= this.engagement.distance;
      }
    });
  }

  join() {
    if (this.joinForm.valid) {
      this.joining = true;
      this.vr.join(this.vrDetail.link, this.joinForm.value).subscribe(result => {
        this.joining= false;
        this.loadVr();
      });
    }
    return false;
  }

}
