import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
  standalone:true,
})
export class AdminDashboard {

  constructor(private router: Router){}
  manageusers(){
    this.router.navigate(['manage-user']);
  }
  viewusers(){
    this.router.navigate(['view-users']);
  }
  logout(){
    localStorage.removeItem('adminToken');
    this.router.navigate(['admin-login']);
  }
  approveposts(){
    this.router.navigate(['admin-approve-posts']);
  }
  viewposts(){
    this.router.navigate(['admin-view-posts']);
  }

}
