import { Component } from '@angular/core';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent {
  sessionsData: any[] = [{date: '03-09-2023', classes: [0,1,2]},{date: '10-09-2023', classes: [0,1,2]}];
  displayedColumns: any[] = ['date', 'classes'];
  classes: {[key: number]: string } = {0 : 'Iqra', 1: 'Hijaiyah', 2: 'Quran'};
}
