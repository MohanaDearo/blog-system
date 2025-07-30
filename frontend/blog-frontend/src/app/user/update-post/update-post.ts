import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-post',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './update-post.html',
  styleUrl: './update-post.scss',
  standalone:true,
})
export class UpdatePost implements OnInit {
  postID!:number;
   updatepostForm : FormGroup;
  constructor(private route:ActivatedRoute,private router:Router, private fb:FormBuilder, private userService : UserService){
    this.updatepostForm = this.fb.group({
      title:['',Validators.required],
      content:['',Validators.required]
    });
  }
  ngOnInit(): void {
      this.postID = Number(this.route.snapshot.paramMap.get('id'));
  }
  get title(){
    return this.updatepostForm.get('title');
  }
  get content(){
    return this.updatepostForm.get('content');
  }

  updatepost(){
    if(this.updatepostForm.invalid){
      console.log('form is invalid');
      this.updatepostForm.markAllAsTouched();
      return;
    }
    const postData = this.updatepostForm.value;
    this.userService.updatePost(this.postID,postData).subscribe({
      next:(response)=>{
        console.log('post updated succeesfully',response);
        this.router.navigate(['view-post']);
      },
      error:(err)=>{
        console.error('unable to update post',err);
      }
    });
  }

  goToDashBoard(){
    this.router.navigate(['view-post']);
  }

}
