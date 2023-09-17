import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Class } from 'src/models/Class';
import { ClassesCRUDService } from '../../../services/classes-crud.service';
import { SessionsCrudService } from '../../../services/sessions-crud.service';
import { Session } from 'src/models/Session';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent implements OnInit {
  id: string = '';
  class?: Class;
  sessions: Session[] = [];

  constructor(private classesCrud: ClassesCRUDService, private route: ActivatedRoute, private sessionsCrud: SessionsCrudService){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.id = paramMap.get('id') ?? '';
    })
  }

  ngOnInit(): void {
      this._fetchClass();
      this._fetchSessionsByClass();
  }

  private _fetchClass(): void{
    this.classesCrud.getClassById(this.id).subscribe((fetchedClass: Class)=>{
      this.class = fetchedClass;
    });
  }

  private async _fetchSessionsByClass(): Promise<void>{
    this.sessionsCrud.getSessionsByClassId(this.id)
      .subscribe((sessions: Session[])=>{
        this.sessions = sessions
      });
  }
}
