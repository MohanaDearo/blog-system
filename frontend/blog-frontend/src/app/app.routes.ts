import { Routes } from '@angular/router';
import { AdminLogin } from './auth/admin-login/admin-login';
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ManageUser } from './admin/manage-user/manage-user';
import { AdminApprovePosts } from './admin/admin-approve-posts/admin-approve-posts';
import { ViewPosts } from './admin/view-posts/view-posts';
import { UserLogin } from './auth/user-login/user-login';
import { UserDashboard } from './user/user-dashboard/user-dashboard';
import { CreatePost } from './user/create-post/create-post';
import { ViewPost } from './user/view-post/view-post';
import { UpdatePost } from './user/update-post/update-post';
import { adminAuthGuard } from './auth/admin-auth-guard';
import { userAuthGuardGuard } from './auth/user-auth-guard-guard';
import { ViewUsers } from './admin/view-users/view-users';

export const routes: Routes = [
  {path:'admin-login', component:AdminLogin},
  {path:'admin-dashboard',component:AdminDashboard,canActivate:[adminAuthGuard]},
  {path:'manage-user',component:ManageUser,canActivate:[adminAuthGuard]},
  {path:'admin-approve-posts',component:AdminApprovePosts,canActivate:[adminAuthGuard]},
  {path:'admin-view-posts',component:ViewPosts,canActivate:[adminAuthGuard]},
  {path:'user-login',component:UserLogin},
  {path:'user-dashboard',component:UserDashboard,canActivate:[userAuthGuardGuard]},
  {path:'create-post',component:CreatePost,canActivate:[userAuthGuardGuard]},
  {path:'view-post',component:ViewPost,canActivate:[userAuthGuardGuard]},
  {path:'update-post/:id',component:UpdatePost,canActivate:[userAuthGuardGuard]},
  {path:'view-users',component:ViewUsers,canActivate:[adminAuthGuard]},
  {path:'', redirectTo:'admin-login',pathMatch:'full'}
];
