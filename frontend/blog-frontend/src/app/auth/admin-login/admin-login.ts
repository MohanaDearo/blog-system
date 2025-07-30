import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-login',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
  standalone:true,
})
export class AdminLogin {
  loginForm: FormGroup;
  isLoading = false;
  constructor(private authService : AuthService, private router : Router, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email:['',[Validators.required]],
      password:['',Validators.required]
    });
  }

  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password')
  }

  login(){

    console.log('login clicked')
    if(this.loginForm.invalid){
      console.log("Form is invalid");
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.authService.loginAdmin(credentials).subscribe({
      next:(response)=>{
        console.log('Admin login success',response);
        localStorage.setItem('adminToken',response.token);
        this.router.navigate(['admin-dashboard']);
        this.isLoading = false;
      },
      error:(err)=>{
        console.error('Admin login failed',err);
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
