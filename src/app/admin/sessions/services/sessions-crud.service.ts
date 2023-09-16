import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData, doc, setDoc,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
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

  createOrUpdateSession(session: Session){
      const docRef = doc(this.fs,this.collectionName,session.date);
      const {date, ...sessionRequest} = session;
      return setDoc(docRef, sessionRequest);
  }
}
