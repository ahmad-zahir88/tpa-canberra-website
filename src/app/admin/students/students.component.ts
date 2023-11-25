import { Component, OnInit } from '@angular/core';
import { ClassesCRUDService } from 'src/app/services/classes-crud.service';
import { StudentsCRUDService } from 'src/app/services/students-crud.service';
import { Class } from 'src/models/Class';
import { Student } from 'src/models/Student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  displayedColumns: string[] = ['fullName','class','age','gender'];
  classes: Class[] = [];

  constructor(private studentsCrud: StudentsCRUDService, private classesCrud: ClassesCRUDService){}

  ngOnInit(): void {
      this._fetchStudents();
      this._fetchClasses();
  }

  private _fetchStudents() {
    this.studentsCrud.getAllStudents().subscribe((students: Student[])=>{
      this.students = students;
    })
  }

  private _fetchClasses() {
    this.classesCrud.getAllClasses().subscribe((classes: Class[])=>{
      this.classes = classes;
    })
  }

  getClassDisplayName(classId: string): string{
    return this.classes.find((findClass: Class)=>findClass.id === classId)?.displayName ?? '';
  }
}
