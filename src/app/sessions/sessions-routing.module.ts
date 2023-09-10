import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionsComponent } from './sessions.component';
import { EditSessionComponent } from './edit-session/edit-session.component';

const routes: Routes = [
  {path: '', component: SessionsComponent, pathMatch: 'full'},
  {path: 'edit', component: EditSessionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule { }
