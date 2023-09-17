import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, docData, getDocs, query, setDoc, where,} from '@angular/fire/firestore';
import { Observable, filter, map } from 'rxjs';
import { Session } from 'src/models/Session';


@Injectable({
  providedIn: 'root'
})
export class SessionsCrudService {
  collectionName: string = 'sessions';
  private fs = inject(Firestore);
  sessionsCollection: CollectionReference = collection(this.fs,this.collectionName);
  constructor() { }

  getAllSessions(): Observable<Session[]> {
    return collectionData(this.sessionsCollection, {idField: 'date'}) as Observable<Session[]>;
  }

  getSessionsByClassId(classId: string): Observable<Session[]>{
    return this.getAllSessions().pipe(
      map(
        sessions=>sessions
                  .filter(
                    session => 
                      session.classes.findIndex((value: string)=>value === classId) !== -1
                  )
      )
    );
  }

  createOrUpdateSession(session: Session){
      const docRef = doc(this.fs,this.collectionName,session.date);
      const {date, ...sessionRequest} = session;
      return setDoc(docRef, sessionRequest);
  }
}
