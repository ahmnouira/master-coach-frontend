import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagerieComponent } from '../shared/components/messagerie/messagerie.component';
import { VisioConferenceComponent } from '../shared/components/visio-conference/visio-conference.component';
import { PreviewComponent } from './preview/preview.component';
import { RdvDetailCommonComponent } from './rdv-detail-common/rdv-detail-common.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((module) => module.AdminModule),
  },
  {
    path: 'coach',
    loadChildren: () =>
      import('./coach/coach.module').then((module) => module.CoachModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./trainee/trainee.module').then((module) => module.TraineeModule),
  },
  {
    path: 'preview',
    component: PreviewComponent,
  },
  {
    path: 'conversations',
    component: MessagerieComponent,
  },
  {
    path: 'video',
    component: VisioConferenceComponent,
  },
  {
    path: 'rdv/detail',
    component: RdvDetailCommonComponent,
  },
  {
    path: 'user/detail',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
