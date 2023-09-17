import { Injectable, inject } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, doc, docData, getDocs, query, setDoc, where,} from '@angular/fire/firestore';
import { Observable, filter, map } from 'rxjs';
import { Student } from 'src/models/Student';


@Injectable({
  providedIn: 'root'
})
export class StudentsCRUDService {
  collectionName: string = 'students';
  private fs = inject(Firestore);
  studentsCollection: CollectionReference = collection(this.fs,this.collectionName);
  constructor() { }

  getAllStudents(): Observable<Student[]> {
    return collectionData(this.studentsCollection, {idField: 'id'}) as Observable<Student[]>;
  }

  getStudentsByClassId(classId: string): Observable<Student[]>{
    return this.getAllStudents().pipe(
      map(
        students=>students
                  .filter(
                    student => 
                      student.class === classId
                  )
      )
    );
  }

  getStudentById(studentId: string): Observable<Student>{
    const docRef = doc(this.fs, this.collectionName, studentId);
    return docData(docRef, {idField: 'id'}) as Observable<Student>;
  }

  addStudent(student: Student): Promise<DocumentReference>{
    return addDoc(this.studentsCollection,student);
  }

  async createOrUpdateStudent(student: Student): Promise<Observable<Student>>{
    let docRef: DocumentReference;
    if(student.id){
      docRef = doc(this.fs, this.collectionName, student.id);
      const { id, ...studentRequest } = student;
      setDoc(docRef, studentRequest);
    } else {
      docRef = await addDoc(this.studentsCollection, student);
    }

    return docData(docRef, {idField: 'id'}) as Observable<Student>;
  }
}
