import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from '../models/athlete';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vr } from '../models/vr';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VrService {

  constructor(private http: HttpClient) { }

  me(): Observable<Athlete> {
    const api = `${environment.urls.baseUrl}/api/me`;
    return this.http.get<Athlete>(api);
  }

  create(formValue): Observable<Vr> {
    const api = `${environment.urls.baseUrl}/api/vr`;
    const vr: Vr = {
      link: "",
      title: formValue.title,
      period: [new Date(formValue.period[0]).toISOString(), new Date(formValue.period[1]).toISOString()],
      detail: formValue.detail,
      created_by: 0,
      created_datetime: "",
      athletes: []
    };
    return this.http.post<Vr>(api, vr);
  }

  get(link: string): Observable<Vr> {
    const api = `${environment.urls.baseUrl}/api/vr/${link}`;
    return this.http.get<Vr>(api);
  }

  available(): Observable<Vr[]> {
    const api = `${environment.urls.baseUrl}/api/vr`;
    return this.http.get<Vr[]>(api);
  }
}
