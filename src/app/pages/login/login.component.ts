import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private snackBar:MatSnackBar,private loginService:LoginService,private router:Router) { }

  loginData={
    username:'',
    password:''
  }

  formSubmit(){
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snackBar.open("username is required",'ok',{
        duration:3000
      })
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snackBar.open("password is required",'ok',{
        duration:3000
      })
      return;
    }

    //request to server to generate token
    this.loginService.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);

        //login
        this.loginService.loginUser(data.token);

        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setuser(user)
            console.log(user);
            //redirect....ADMIN admindashboard
              if(this.loginService.getUserRole()=="ROLE_ADMIN"){
                //admin
                this.router.navigate(['admin'])
                this.loginService.loginStatusSubject.next(true)

              }else if(this.loginService.getUserRole()=="ROLE_NORMAL"){
                //normal dashboard
                this.router.navigate(['user-dashboard'])
                this.loginService.loginStatusSubject.next(true)
              }else{
                //netiher
                  this.loginService.logout();
              }
            //redirect ....NORAML normal dasboard

          }
        )
        
      },
      (error)=>{
        console.log("error");
        console.log(error);
        this.snackBar.open("Invalid credentials",'ok',{
          duration:3000
        })
      }
    )
    
  }

  ngOnInit(): void {
  }

}
