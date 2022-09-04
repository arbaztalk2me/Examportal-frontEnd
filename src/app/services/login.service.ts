import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject=new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generate token

  public generateToken(loginData:any){
    
    return this.http.post(`${baseUrl}/generate-token`,loginData)

  }

  //current-user which is login
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`)
  }

  //login user:set token to localstorage

  public loginUser(token:any){
    localStorage.setItem("token",token);
    return true;
  }

  //check isLogin or not
  public isLogin(){
    let token=localStorage.getItem("token");
    if(token==undefined || token==null || token==''){
      return false;
    }else{
      return true;
    }
  }

  //logout: remove token from local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //getToken
  public getToken(){
    return localStorage.getItem("token");
  }

  //set userDetails
  public setuser(user:any){
    localStorage.setItem("user",JSON.stringify(user))
  }

  public getuser(){
    let userStr= localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole(){
    let user=this.getuser();
    return user.authorities[0].authority;
  }


}
