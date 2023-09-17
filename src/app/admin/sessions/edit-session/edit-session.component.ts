import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionsCrudService } from '../../../services/sessions-crud.service';
import { Session } from 'src/models/Session';
import { Router } from '@angular/router';
import { DateFormatter } from 'src/util/DateUtil';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.scss']
})
export class EditSessionComponent {
  @Input() date?: Date;
  @Output() dateChange: EventEmitter<Date | undefined> = new EventEmitter();

  _session?: Session;
  @Input() set session(value: Session | undefined){
    this._session = value;
    if(value){
      this.sessionForm.patchValue(value);
    } else{
      this.sessionForm.patchValue({classes: []})
    }
    this.sessionForm.markAsPristine();
  };

  @Input() mode: 'edit' | 'new' = 'edit';

  sessionForm: FormGroup = new FormGroup({
    classes: new FormControl<string[] | null>(null,{validators: [Validators.minLength(1), Validators.required],})
  });
  classes: any[] = [{id: 'iqro', displayName: 'Iqro'},{id: 'hijaiyah', displayName: 'Hijaiyah'},{id: 'quran', displayName: 'Qur\'an'}]
  
  constructor(private sessionsCrud: SessionsCrudService, private _snackbar: MatSnackBar){}

  selectAllClasses(): void{
    let classesValue: any[] = [];
    this.classes.forEach(element => {
      classesValue.push(element.id);
    });
    this.sessionForm.patchValue({classes: classesValue})
  }

  async saveSession(): Promise<void>{
    if(this.date){
      const sessionData = {...this.sessionForm.value, date: new DateFormatter().toString(this.date)};
      try{
        await this.sessionsCrud.createOrUpdateSession(sessionData);
        this._snackbar.open('Session Succesfully Saved!', 'OK');
      } catch{
        this._snackbar.open('An error occured. Please contact your admin.', 'OK');
      }
    }
  }

  close(): void{
   this.date = undefined;
   this.dateChange.emit(this.date);
  }
}
