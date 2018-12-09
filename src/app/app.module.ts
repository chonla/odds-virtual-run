import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { QuillModule } from 'ngx-quill'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VrListComponent } from './components/vr-list/vr-list.component';
import { StatsBoxComponent } from './components/stats-box/stats-box.component';
import { VrDetailComponent } from './components/vr-detail/vr-detail.component';
import { VrEditorComponent } from './components/vr-editor/vr-editor.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    VrListComponent,
    StatsBoxComponent,
    VrDetailComponent,
    VrEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    BsDatepickerModule.forRoot(),
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
