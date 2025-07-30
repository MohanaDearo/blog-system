import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { Router } from '@angular/router';

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken');
  const router = inject(Router);
  if(token){
    return true;
  }else{
    console.log('Access denied. Please log in to access');
    router.navigate(['user-login']);
    return false;
  }
};
