import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-user',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './manage-user.html',
  styleUrl: './manage-user.scss',
  standalone:true
})
export class ManageUser implements OnInit {
  createuserForm : FormGroup;
  successMessage = '';
  failedMessage='';
  roles :any[] = [];
  constructor(private router:Router, private userService:UserService, private fb:FormBuilder){
    this.createuserForm = this.fb.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      role:['',[Validators.required]],
    });
  }
  ngOnInit(): void {
      this.loadRoles();
  }
  loadRoles(){
    this.userService.getRoles().subscribe({
      next:(roles)=>{
        this.roles = roles.data;
        console.log('Roles fetched successfully');
      },
      error:(err)=>{
        console.log('unable to fetch roles');
      }
    });
  }
  get name(){
    return this.createuserForm.get('name');
  }
  get email(){
    return this.createuserForm.get('email');
  }
  get password(){
    return this.createuserForm.get('password');
  }
  get role(){
    return this.createuserForm.get('role');
  }

  createuser(){
    if(this.createuserForm.invalid){
      console.log("Form is invalid");
      this.createuserForm.markAllAsTouched();
      return;
    }
    const userData = this.createuserForm.value;

    this.userService.createUser(userData).subscribe({
      next:(response)=>{
        console.log('user created successfully',response);
        this.successMessage='user created successfully';
        setTimeout(()=>{
          this.successMessage='';
        },3000);
      },
      error:(err)=>{
         console.log('user creation failed',err);
        this.failedMessage='user creation failed';
        setTimeout(()=>{
          this.failedMessage='';
        },3000);
      }
    });
    
  }
  goToDashBoard(){
    this.router.navigate(['admin-dashboard']);
  }
}
