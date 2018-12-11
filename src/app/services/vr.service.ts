import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Athlete } from '../models/athlete';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VrService {

  constructor(private http: HttpClient) { }

  me(): Observable<Athlete> {
    const api = `${environment.urls.baseUrl}/api/me`;
    return this.http.get<Athlete>(api);
  }
}
