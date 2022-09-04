import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
  user:any={};

  constructor(public loginService:LoginService) { }

  public logout(){
    this.loginService.logout();
    window.location.reload();
  }

  ngOnInit(): void {  
     this.isLoggedIn=this.loginService.isLogin();
     this.user=this.loginService.getuser();
     this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLoggedIn=this.loginService.isLogin();
      this.user=this.loginService.getuser();
     })
  }

}
