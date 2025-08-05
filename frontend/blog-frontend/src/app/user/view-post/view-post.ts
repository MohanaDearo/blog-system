import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/posts.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-post',
  imports: [CommonModule],
  templateUrl: './view-post.html',
  styleUrl: './view-post.scss'
})
export class ViewPost implements OnInit {
  userPosts:Post[] = [];
  successMessage = '';
  errorMessage = '';
  isLoading : boolean = false;
  canUpdate = 0;
  isModalDisplay : boolean = false;
  postId : number | null = null ;
  constructor(private router:Router, private userService:UserService){};
   ngOnInit(): void {
      this.isLoading = true;
      this.checkCanUpdate();
      this.loadAllPost();      
  }
  checkCanUpdate(){
    this.userService.checkCanUpdate().subscribe({
      next:(response)=>{
        this.canUpdate = response.data;
        console.log(this.canUpdate);
      }
    });
  }
  loadAllPost(){
    this.userService.getPost().subscribe({
      next:(response)=>{
        this.userPosts = response.data;
        this.isLoading = false;
        this.successMessage = "Posts fetched successfully"
      },
      error:(err)=>{
        console.error("failed to fetch posts",err);
        this.isLoading = false;
        this.errorMessage='Could not fetch posts. Something went wrong'
      }
    });
  }
  goToDashBoard(){
    this.router.navigate(['user-dashboard']);
  }

  deletePosts(){
    if(this.postId===null){
      return;
    }
    this.userService.deletePost(this.postId).subscribe({
      next:(response)=>{
        console.log('Post deleted successfully',response);
        this.loadAllPost();
      },
      error:(err)=>{
        console.log('Post Not deleted',err);
      }
    });
  }
  updatePosts(postID:number){
    this.router.navigate(['update-post',postID]);
  }

  confirmDelete(postId:number){
    this.postId = postId;
    this.isModalDisplay=true;
  }

  cancel(){
    this.isModalDisplay=false;
  }
}
