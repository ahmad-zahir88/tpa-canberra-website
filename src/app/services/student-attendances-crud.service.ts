import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Observable, map, tap } from 'rxjs';
import { StudentAttendance } from 'src/models/Attendance';
@Injectable({
  providedIn: 'root'
})
export class StudentAttendancesCRUDService {
  collectionName: string = 'studentAttendances';
  private fs = inject(Firestore);
  studentAttendancesCollection: CollectionReference = collection(this.fs,this.collectionName);
  constructor() { }

  getAllStudentAttendances(): Observable<StudentAttendance[]> {
    return collectionData(this.studentAttendancesCollection, {idField: 'id'}) as Observable<StudentAttendance[]>;
  }

  getStudentAttendancesByClassIdAndDate(classId: string, date: string): Observable<StudentAttendance[]>{
    return this.getAllStudentAttendances().pipe(
      tap(
        (data)=>{console.log(data); console.log(classId); console.log(date)}
        
      ),
      map(
        studentAttendances=>studentAttendances
                  .filter(
                    studentAttendance => 
                      studentAttendance.class === classId
                      && studentAttendance.sessionDate === date
                  )
      ),
      
    );
  }

  async createOrUpdateStudentAttendance(studentAttendance: StudentAttendance): Promise<void>{
    let docRef: DocumentReference;
    if(studentAttendance.id){
      docRef = doc(this.fs, this.collectionName, studentAttendance.id);
      const { id, ...attendanceRequest } = studentAttendance;
      return setDoc(docRef, attendanceRequest);
    } else {
      console.log('Creating new attendance');
      
      docRef = await addDoc(this.studentAttendancesCollection, studentAttendance);
      console.log(docRef);
      
      return;
    }
    
  }

  async batchCreateOrUpdateStudentAttendances(studentAttendances: StudentAttendance[]): Promise<void>{
    for (const studentAttendance of studentAttendances) {
      await this.createOrUpdateStudentAttendance(studentAttendance);
    }
    return;
  }
  
}
