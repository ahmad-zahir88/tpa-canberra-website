import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class SessionsCrudService {
  collectionName: string = 'sessions';
  private fs = inject(Firestore);
  constructor() { }

  getAllSessions() {
    
    const sessionsCollection= collection(this.fs,'sessions');
    
    collectionData(sessionsCollection).subscribe((data)=>{
      console.log(data);
      
    });
  }
}
