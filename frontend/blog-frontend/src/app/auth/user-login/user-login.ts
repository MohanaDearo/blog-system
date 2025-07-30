import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-login',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss',
  standalone:true,
})
export class UserLogin {
  loginForm:FormGroup;
  isLoading = false;
  constructor(private router:Router,private authService : AuthService, private fb:FormBuilder){
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }

  login(){
    console.log('login clicked');
    if(this.loginForm.invalid){
      console.log('Form is invalid');
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading= true;
    const credentials = this.loginForm.value;
    this.authService.loginUser(credentials).subscribe({
      next:(response)=>{
        console.log('login successfull',response);
        localStorage.setItem('userToken',response.token);
        this.router.navigate(['user-dashboard']);
        this.isLoading = false;
      },
      error:(err)=>{
         console.error('User login failed',err);
        if(err.status===401){
          alert("Invalid email or password");
        }else{
          alert("Something went wrong. Please try again");
        }
        this.isLoading = false;
      }
    });
  }
}
