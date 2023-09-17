import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, docData, getDoc, setDoc,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Class } from 'src/models/Class';

@Injectable({
  providedIn: 'root'
})
export class ClassesCRUDService {
  collectionName: string = 'classes';
  classesCollection: CollectionReference = collection(this.fs, this.collectionName);
  constructor(private fs: Firestore) { }

  getAllClasses(): Observable<Class[]> {
    return collectionData(this.classesCollection, { idField: 'id' }) as Observable<Class[]>;
  }

  getClassById(classId: string): Observable<Class>{
    const docRef = doc(this.fs, this.collectionName, classId);
    return docData(docRef) as Observable<Class>;
  }

  createOrUpdateClass(updatedClass: Class) {
    const docRef = doc(this.fs, this.collectionName, updatedClass.id);
    const { id, ...classRequest } = updatedClass;
    return setDoc(docRef, classRequest);
  }
}
