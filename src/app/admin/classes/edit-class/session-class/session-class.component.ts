import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClassesCRUDService } from 'src/app/services/classes-crud.service';
import { StudentsCRUDService } from 'src/app/services/students-crud.service';
import { Class } from 'src/models/Class';
import { Student } from 'src/models/Student';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentAttendancesCRUDService } from 'src/app/services/student-attendances-crud.service';
import { StudentAttendance } from 'src/models/Attendance';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-session-class',
  templateUrl: './session-class.component.html',
  styleUrls: ['./session-class.component.scss']
})
export class SessionClassComponent implements OnInit {
  classId: string = '';
  date: string = '';
  students: any[] = [];
  className: string = '';
  attendancesFormArray?: FormArray<FormGroup>;
  studentAttendances: StudentAttendance[] = [];

  constructor(
    private route: ActivatedRoute,
    private classesCrud: ClassesCRUDService,
    private studentsCrud: StudentsCRUDService, 
    private studentAttendancesCrud: StudentAttendancesCRUDService,
    private _snackbar: MatSnackBar
  ){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      this.classId = paramMap.get('id') ?? '';
      this.date = paramMap.get('date') ?? '';
    })
  }

  ngOnInit(): void {
      this._fetchClass();
      this._fetchStudents();
      this._fetchStudentAttendances();
  }

  private _fetchStudentAttendances() {
    this.studentAttendancesCrud.getStudentAttendancesByClassIdAndDate(this.classId, this.date)
      .subscribe((data)=>{
        this.studentAttendances = data;
        this._updateFormArray();
      })
  }

  private _fetchClass() {
    this.classesCrud.getClassById(this.classId).subscribe((fetchedClass: Class)=>{
      this.className = fetchedClass.displayName;
    })
  }

  private _fetchStudents() {
    this.studentsCrud.getStudentsByClassId(this.classId).subscribe((fetchedStudents: Student[])=>{
      this.students = fetchedStudents;
      this._updateFormArray();
    })
  }

  private _updateFormArray(){
    // if(this.attendancesFormArray) this.attendancesFormArray.clear();
    const formGroups: FormGroup[] = [];
    this.students.forEach((student: Student)=>{
      const studentAttendance: StudentAttendance | undefined = this.studentAttendances.find(att=>att.studentId === student.id);
      formGroups.push(
        new FormGroup({
          id: new FormControl<string | undefined>(studentAttendance?.id),
          class: new FormControl<string>(this.classId),
          sessionDate: new FormControl<string>(this.date),
          studentId: new FormControl<string>(student.id),
          isAttend: new FormControl<boolean>(studentAttendance?.isAttend ?? false, Validators.required),
          comment: new FormControl<string | null>(studentAttendance?.comment ?? null)
        })
      );
    })
    this.attendancesFormArray = new FormArray(formGroups,[],[]);
  }

  getFormControl(index: number, fcName: string): FormControl{
    return this.attendancesFormArray?.at(index).get(fcName) as FormControl;
  }


  onAttendanceClick(index: number): void{
    if(this.attendancesFormArray){
    const fg = this.attendancesFormArray.at(index);
    if(fg.get('isAttend')?.value && !fg.get('comment')?.value){
      fg.patchValue({comment: this.commentDefaultValue});
    } else if (!fg.get('isAttend')?.value && fg.get('comment')?.value === this.commentDefaultValue){
      fg.patchValue({comment: null});
    }}
  }

  async saveSessionClass(): Promise<void>{
    try{
      if(this.attendancesFormArray){
        await this.studentAttendancesCrud
          .batchCreateOrUpdateStudentAttendances(this.attendancesFormArray.value);
          this._snackbar.open('Attendance Succesfully Saved!', 'OK');
      }
      else{
        throw('Error');
      }
      } catch{
        this._snackbar.open('An error occured. Please contact your admin.', 'OK');
    }
    
  }
  
  commentDefaultValue: string = "Ngaji (Lancar/Ulang)\n- [Komentar disini]\nHafalan (Lancar/Ulang)\n- [Komentar disini]\nLain-Lain\n- [Komentar disini]"
}