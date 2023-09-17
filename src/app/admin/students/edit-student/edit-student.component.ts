import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClassesCRUDService } from 'src/app/services/classes-crud.service';
import { StudentsCRUDService } from 'src/app/services/students-crud.service';
import { Class } from 'src/models/Class';
import { Student } from 'src/models/Student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit{
  studentForm: FormGroup = new FormGroup({
                                fullName: new FormControl('',Validators.required),
                                email: new FormControl(''),
                                class: new FormControl('', Validators.required)
                              });
  
  student?: Student;
  id?: string;
  classes: Class[] = [];

  constructor(
    private studentsCrud: StudentsCRUDService,
    private route: ActivatedRoute,
    private router: Router,
    private classesCrud: ClassesCRUDService,
    private _snackbar: MatSnackBar){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.id = paramMap.get('id') ?? '';
    })
  }

  ngOnInit(): void {
      this._fetchStudent();
      this._fetchClasses();
  }

  private _fetchStudent() {
    if(this.id)
    this.studentsCrud.getStudentById(this.id).subscribe((student: Student)=>{
      this.student = student;
      const {id, ...studentData} = student;
      this.studentForm.patchValue(studentData);
    })
  }

  private _fetchClasses() {
    this.classesCrud.getAllClasses().subscribe((classes: Class[])=>{
      this.classes = classes;
    })
  }

  async saveStudent(): Promise<void>{
    const studentData = {id: this.id, ...this.studentForm.value};
      try{
        (await this.studentsCrud.createOrUpdateStudent(studentData)).subscribe((student: Student)=>{
          const {id, ...studentData} = student;
          this._snackbar.open('Student Succesfully Saved!', 'OK');
          this.router.navigate(['./',id],{relativeTo: this.route});
        })
      } catch{
        this._snackbar.open('An error occured. Please contact your admin.', 'OK');
      }
  }
}
