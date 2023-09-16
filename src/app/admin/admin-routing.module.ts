import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sessions', loadChildren: ()=>import('./sessions/sessions.module').then(m=>m.SessionsModule)},
  {path: 'classes', loadChildren: ()=>import('./classes/classes.module').then(m=>m.ClassesModule)},
  {path: 'teachers', loadChildren: ()=>import('./teachers/teachers.module').then(m=>m.TeachersModule)},
  {path: 'students', loadChildren: ()=>import('./students/students.module').then(m=>m.StudentsModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
