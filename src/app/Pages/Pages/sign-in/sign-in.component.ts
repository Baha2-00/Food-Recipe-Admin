import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { LoginDTO } from 'src/app/DTO/BackendDtos/LoginDTO';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  obj : LoginDTO = new LoginDTO();

  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService) { }



SubmitLogin(){
  if(this.obj.userName == undefined){
    this.toastr.warning('Please Enter User name')
    return;
  }
  if(this.obj.password == undefined){
    this.toastr.warning('Please Enter Password')
    return;
  }
  if(this.obj.userName == ''){
    this.toastr.warning('User name Could not be empty')
    return;
  }
  if(this.obj.userName=='bahaothman62@gmail.com' && this.obj.password=='Baha2000'){
    this.spinner.show()
    this.backend.Login(this.obj).subscribe(res=>{
      this.spinner.hide()
      localStorage.setItem('isLoggedIn','true')
      localStorage.setItem('token',res)
      let data: any = jwtDecode(res);
      localStorage.setItem('userId',data.UserId)
      this.router.navigate(['/Admin-Details'])
   } , error=>{
    this.spinner.hide()
    this.toastr.error('Wrong User name / Password')
   })
  }else{
    this.toastr.error('Must be Admin')
  }
 
    
  }
}
