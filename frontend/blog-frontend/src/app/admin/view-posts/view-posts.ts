import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/posts.model';

@Component({
  selector: 'app-view-posts',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-posts.html',
  styleUrl: './view-posts.scss'
})
export class ViewPosts implements OnInit {
  allPosts:Post[] = [];
  successMessage = '';
  errorMessage='';
  isLoading : boolean = false;
  constructor(private adminService : AdminService, private router:Router){}
  ngOnInit(): void {
      this.loadAllPosts();
  }
  loadAllPosts(){
    console.log('View posts clicked');
    this.isLoading = true;
    this.adminService.getAllPosts().subscribe({
      next:(response)=>{
        this.allPosts = response.data;
        this.isLoading=false;
      },
      error:(err)=>{
        console.error("failed to fetch posts",err);
        this.isLoading=false;
        this.errorMessage='Could not fetch posts. Something went wrong'
      }
    });
  }
  goToDashBoard(){
    this.router.navigate(['/admin-dashboard']);
  }
  deletePosts(postID:number){
    this.adminService.deletePost(postID).subscribe({
      next : (response)=>{
        console.log('Post deleted successfully',response);
        this.loadAllPosts();
      },
      error:(err)=>{
        console.error('post deletion failed',err);
      }
    });
  }
}
