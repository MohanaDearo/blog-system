import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject, Inject } from '@angular/core';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('adminToken');
  const router = inject(Router);
  if(token){
    return true;
  }else{
    console.log('Access denied. Please log in to access');
    router.navigate(['admin-login']);
    return false;
  }
};
