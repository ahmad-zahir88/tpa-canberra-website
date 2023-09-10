import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  username: string = 'Admin';
  activeTab: string = '';
  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd){
        this.activeTab = event.urlAfterRedirects;
        
      }
    })    
  }

  redirectTo(path: string): void{
    this.activeTab = path;
    try {
      this.router.navigate([path]);
    } catch (error) {
      
    }
    
  }
}
