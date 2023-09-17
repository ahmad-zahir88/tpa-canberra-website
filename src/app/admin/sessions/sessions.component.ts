import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SessionsCrudService } from '../../services/sessions-crud.service';
import { Session } from 'src/models/Session';
import { DateFormatter } from 'src/util/DateUtil';
import { MatCalendar } from '@angular/material/datepicker';
import { isDataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit, AfterViewInit{
  sessions: Session[] = [];
  displayedColumns: any[] = ['date', 'classes'];
  constructor(private sessionsCrud: SessionsCrudService, private renderer: Renderer2){}
  @ViewChild ('calendar') calendar!: MatCalendar <Date>;

  ngOnInit(): void {
    this._fetchSessions();
  }

  ngAfterViewInit(): void {
    this.calendar.stateChanges.subscribe(()=>{
      setTimeout(()=>{this.highlightSessions()});
    });
  }

  private _fetchSessions(): void{
    this.sessionsCrud.getAllSessions().subscribe((sessions: Session[])=>{
      this.sessions = sessions;
      this.sessionsAriaDates = this.sessions.map((session)=>new DateFormatter().toAria(new Date(session.date)));      
      this.highlightSessions();
    })
  }

  highlightSessions(): void{
    const days = document.querySelectorAll (
      'mat-calendar .mat-calendar-table .mat-calendar-body-cell'
    );
    
    Array.from(days).forEach((day) => {
      const dayMatched = this.sessionsAriaDates.find(
        (sessionDate) => day.ariaLabel === sessionDate) !== undefined;
      const dayCircle = day.querySelector('.mat-calendar-body-cell-content');
      if (dayMatched) {
        this.renderer.addClass(dayCircle, 'session-exist');
      } else {
        this.renderer.removeClass (dayCircle, 'session-exist');
      }
    });
  }
  _dateSelected?: string;

  set dateSelected(value: Date | undefined){
    this._dateSelected = value ? new DateFormatter().toString(value) : undefined;
  }

  get dateSelected(): Date | undefined{
    return this._dateSelected ? new Date(this._dateSelected) : undefined;
  }

  get sessionSelected(): Session | undefined{
    return this.sessions.find(session=>session.date === this._dateSelected);
  }

  sessionsAriaDates: string[] = [];
}
