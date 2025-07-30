import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response.model";
import { Post } from "../models/posts.model";

@Injectable({
  providedIn:'root'
})
export class AdminService{
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  
  getPendingPosts() : Observable<any>{
    
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/admin/getpendingposts`,{headers});
  }
  getUsers():Observable<any>{
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/admin/users`,{headers});
  }
  approvePosts(postID:number) {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/admin/approvepost/${postID}`,null,{headers});
  }
  rejectPosts(postID:number){
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/admin/rejectpost/${postID}`,null,{headers});
  }

  getAllPosts(){
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.get<ApiResponse<Post[]>>(`${this.apiUrl}/admin/getposts`,{headers});
  }

  deletePost(postID:number){
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiUrl}/admin/deletepost/${postID}`,{headers});
  }
  
  allowUpdate(userID : number, canUpdate:boolean){
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put(`${this.apiUrl}/admin/allowupdate/${userID}`,{can_update:canUpdate},{headers});
  }
}