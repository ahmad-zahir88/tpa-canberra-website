import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
  {path: '', component: StudentsComponent, pathMatch: 'full'},
  {path: 'edit-student', component: EditStudentComponent},
  {path: 'edit-student/:id', component: EditStudentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
