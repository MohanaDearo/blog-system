import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response.model";
import { Post } from "../models/posts.model";
import { Role } from "../models/roles.model";
import { Update } from "../models/update.model";


@Injectable({
  providedIn:'root'
})
export class UserService{
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  createUser(userData : {
    name :string,email : string, password : string, role:string,
  }) : Observable<any>{
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/admin/users`,userData, {headers});
  }
  createPost(postData:{
    title:string, content:string
  }):Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    console.log(token);
    return this.http.post(`${this.apiUrl}/posts`,postData,{headers});
  }
  updatePost(postId:number,postData:{
    title:string, content:string
  }):Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    console.log(token);
    return this.http.put(`${this.apiUrl}/posts/${postId}`,postData,{headers});
  }

  getPost() : Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/posts`,{headers});
  }

  getRoles() : Observable<any>{
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get<ApiResponse<Role[]>>(`${this.apiUrl}/admin/getroles`,{headers});
  }

  deletePost(postID:number){
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/posts/${postID}`,{headers});
  }

  checkCanUpdate() : Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get<ApiResponse<Update>>(`${this.apiUrl}/canupdate`,{headers});
  }
}