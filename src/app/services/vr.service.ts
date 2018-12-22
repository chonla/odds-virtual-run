import { Injectable, Version } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from '../models/athlete';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vr } from '../models/vr';

@Injectable({
  providedIn: 'root'
})
export class VrService {

  constructor(private http: HttpClient) {
  }

  version(): Observable<Version> {
    const api = `${environment.urls.baseUrl}/api/version`;
    return this.http.get<Version>(api);
  }

  me(): Observable<Athlete> {
    const api = `${environment.urls.baseUrl}/api/me`;
    return this.http.get<Athlete>(api);
  }

  update(link: string, formValue): Observable<Vr> {
    const api = `${environment.urls.baseUrl}/api/vr/${link}`;
    // only _id, title, period, detail will be patched, the rest will be discarded.
    const vr: Vr = {
      _id: formValue._id,
      link: "",
      title: formValue.title,
      period: [new Date(formValue.period[0]).toISOString(), new Date(formValue.period[1]).toISOString()],
      detail: formValue.detail,
      created_by: 0,
      created_datetime: "",
      engagements: []
    };
    return this.http.patch<Vr>(api, vr);
  }

  create(formValue): Observable<Vr> {
    const api = `${environment.urls.baseUrl}/api/vr`;
    const vr: Vr = {
      _id: "",
      link: "",
      title: formValue.title,
      period: [new Date(formValue.period[0]).toISOString(), new Date(formValue.period[1]).toISOString()],
      detail: formValue.detail,
      created_by: 0,
      created_datetime: "",
      engagements: []
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

  mine(): Observable<Vr[]> {
    const api = `${environment.urls.baseUrl}/api/me/vr`;
    return this.http.get<Vr[]>(api);
  }

  join(link: string, formValue): Observable<Vr> {
    const api = `${environment.urls.baseUrl}/api/join/${link}`;
    return this.http.post<Vr>(api, formValue);
  }

  leave(link: string): Observable<Vr> {
    const api = `${environment.urls.baseUrl}/api/leave/${link}`;
    return this.http.post<Vr>(api, {});
  }

  remove(link: string): Observable<void> {
    const api = `${environment.urls.baseUrl}/api/vr/${link}`;
    return this.http.delete<void>(api, {});
  }

}
