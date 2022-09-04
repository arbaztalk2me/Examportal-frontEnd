import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'', 
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username==""||this.user.username==null){
      this.snack.open("Username is required!!",'ok',{
        duration:3000,
      })
      return;
    }
    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
        // alert("success")
        Swal.fire('Success','user is registered with Id '+data.id,'success')
      },
      (error)=>{
        console.log(error);
        // alert("something went wrong")
        this.snack.open("Something went wrong!!",'ok',{
          duration:3000,
          
        })
      }
    )
  }

  ngOnInit(): void {
  }

}
