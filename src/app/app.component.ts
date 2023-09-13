import { Component } from '@angular/core';
import { Firestore, collection, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tpa-canberra-website';

  constructor(){

  }
}
