import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-approve-posts',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin-approve-posts.html',
  styleUrl: './admin-approve-posts.scss',
  standalone:true,
})
export class AdminApprovePosts implements OnInit {
  isLoading :boolean = false;
  pendingPosts:any[] = [];
  successMessage='';
  errorMessage='';
  constructor(private adminService : AdminService, private router:Router,){}

  ngOnInit(): void {
    this.isLoading = true;
      this.loadPendingPosts();
  }
  loadPendingPosts(){
    console.log('approveposts clicked');
    this.adminService.getPendingPosts().subscribe({
      next : (posts)=>{
        this.pendingPosts = posts.data;
        this.isLoading = false;
        console.log(this.pendingPosts);
      },
      error:(err)=>{
        console.error("Failed to load posts",err);
        this.isLoading = false;
        this.errorMessage='Could not load pending posts. Please try again later';
      }
    });
  }
  approvePosts(postID:number){
    this.adminService.approvePosts(postID).subscribe({
      next : (response)=>{
        this.successMessage = "Post approved";
        console.log('Post approved successfully',response);
        this.loadPendingPosts();
      },
      error:(err)=>{
        console.error('Post approval failed',err);
      }
    });
  }
   rejectPosts(postID:number){
    this.adminService.rejectPosts(postID).subscribe({
      next : (response)=>{
        this.successMessage = "Post rejected";
        console.log('Post rejected successfully',response);
        this.loadPendingPosts();
      },
      error:(err)=>{
        console.error('Post rejection failed',err);
      }
    });
  }
  goToDashBoard(){
    this.router.navigate(['admin-dashboard']);
  }

}
