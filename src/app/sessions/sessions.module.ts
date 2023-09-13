import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './sessions.component';
import { MatTableModule } from '@angular/material/table';
import { EditSessionComponent } from './edit-session/edit-session.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    SessionsComponent,
    EditSessionComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class SessionsModule { }
