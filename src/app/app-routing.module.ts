import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VrListComponent } from './components/vr-list/vr-list.component';
import { VrDetailComponent } from './components/vr-detail/vr-detail.component';
import { VrEditorComponent } from './components/vr-editor/vr-editor.component';
import { ReceptionistGuard } from './guards/receptionist.guard';

const routes: Routes = [{
  path: '',
  component: WelcomeComponent,
  canActivate: [ReceptionistGuard]
}, {
  path: 'vr',
  component: DashboardComponent,
  children: [
    {
      path: '',
      children: [
        {
          path: '',
          component: VrListComponent
        },
        {
          path: 'new',
          component: VrEditorComponent
        },
        {
          path: ':id',
          component: VrDetailComponent
        },
        {
          path: 'edit/:id',
          component: VrEditorComponent
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
