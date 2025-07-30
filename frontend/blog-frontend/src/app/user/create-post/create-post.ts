import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss',
  standalone:true,
})
export class CreatePost {
  createpostForm : FormGroup;
  constructor(private router:Router, private fb:FormBuilder, private userService : UserService){
    this.createpostForm = this.fb.group({
      title:['',Validators.required],
      content:['',Validators.required]
    });
  }
  get title(){
    return this.createpostForm.get('title');
  }
  get content(){
    return this.createpostForm.get('content');
  }

  createpost(){
    if(this.createpostForm.invalid){
      console.log('form is invalid');
      this.createpostForm.markAllAsTouched();
      return;
    }
    const postData = this.createpostForm.value;
    this.userService.createPost(postData).subscribe({
      next:(response)=>{
        console.log('post created succeesfully',response);
      },
      error:(err)=>{
        console.error('unable to create post',err);
      }
    });
  }

  goToDashBoard(){
    this.router.navigate(['user-dashboard']);
  }
}
