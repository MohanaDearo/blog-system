import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn:'root'
})
export class AuthService{
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient){}
  loginAdmin(credentials : {
    email : string, password : string
  }) : Observable<any>{
    // console.log('Sending API call to backend with:', credentials);
    return this.http.post(`${this.apiUrl}/admin/login`,credentials);
  }

  loginUser(credentials : {
    email:string, password:string
  }):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,credentials);
  }
}