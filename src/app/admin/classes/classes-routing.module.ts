import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { SessionClassComponent } from './edit-class/session-class/session-class.component';

const routes: Routes = [
  {path: '', component: ClassesComponent, pathMatch: 'full'},
  {path: 'edit-class/:id', component: EditClassComponent},
  {path: 'edit-class/:id/session/:date', component: SessionClassComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
