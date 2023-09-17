import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { MatTableModule } from '@angular/material/table';
import { ClassesCRUDService } from '../../services/classes-crud.service';
import { EditClassComponent } from './edit-class/edit-class.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SessionClassComponent } from './edit-class/session-class/session-class.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClassesComponent,
    EditClassComponent,
    SessionClassComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [
    ClassesCRUDService
  ]
})
export class ClassesModule { }
