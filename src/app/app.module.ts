import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuillModule } from 'ngx-quill'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VrListComponent } from './components/vr-list/vr-list.component';
import { StatsBoxComponent } from './components/stats-box/stats-box.component';
import { VrDetailComponent } from './components/vr-detail/vr-detail.component';
import { VrEditorComponent } from './components/vr-editor/vr-editor.component';
import { ApiRequestInterceptor } from './interceptor/api-request.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { FriendlyDateTimePipe } from './pipes/friendly-date-time.pipe';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    VrListComponent,
    StatsBoxComponent,
    VrDetailComponent,
    VrEditorComponent,
    FriendlyDateTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    QuillModule
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
