import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss'
})
export class UserDashboard {
  constructor(private router:Router){}
  createpost(){
    console.log('routed');
    this.router.navigate(['create-post']);
  }
  
  viewpost(){
    this.router.navigate(['view-post']);
  }
  logout(){
    localStorage.removeItem('userToken');
    console.log('logged out successfully');
    this.router.navigate(['user-login']);
  }
}
