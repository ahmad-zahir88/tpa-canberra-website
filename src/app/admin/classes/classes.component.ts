import { Component, OnInit } from '@angular/core';
import { Class } from 'src/models/Class';
import { ClassesCRUDService } from '../../services/classes-crud.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit{
  classes: Class[] = [];
  displayedColumns: string[] = ['displayName', 'description'];

  constructor(private classesCrud: ClassesCRUDService){}

  ngOnInit(): void {
      this._fetchClasses();
  }

  private _fetchClasses(): void{
    this.classesCrud.getAllClasses().subscribe((classes: Class[])=>{
      this.classes = classes;
    });
  }
}
