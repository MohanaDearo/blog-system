import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-users.html',
  styleUrl: './view-users.scss'
})
export class ViewUsers implements OnInit {
  allUsers:any[] = [];
  isLoading : boolean = false;
  constructor(private adminService:AdminService, private router:Router){}
  ngOnInit(): void {
    this.isLoading = true;
      this.loadAllUsers();
  }
  loadAllUsers(){
    this.adminService.getUsers().subscribe({
      next : (response)=>{
        this.allUsers = response.data;
        this.isLoading = false;
        console.log('users fetched successfully');
      },
      error:(err)=>{
        console.error('unable to fetch users',err)
        this.isLoading = false;
      }
    });
  }
  goToDashBoard(){
    this.router.navigate(['admin-dashboard']);
  }
  onToggleCanUpdate(user:any, event:Event){
    const ischecked = (event.target as HTMLInputElement).checked;
    this.adminService.allowUpdate(user.id, ischecked).subscribe({
      next :(response)=>{
        user.can_update = ischecked ? 1 : 0;
        console.log("Permission updated successfully",response);
      },
      error:(err)=>{
        console.error('unable to update user',err)
      }
    });
  }
  
}
