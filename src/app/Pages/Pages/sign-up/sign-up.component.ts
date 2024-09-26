import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { CreateNewAdminDTO } from 'src/app/DTO/BackendDtos/CreateNewAdminDTO';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  input:CreateNewAdminDTO=new CreateNewAdminDTO()

  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService) { }


CreateNewAccount(){

  if(this.input.firstName == undefined || this.input.firstName == ''){
    this.toastr.warning('Please Enter First name')
    return;
  }
  if(this.input.lastName == undefined || this.input.lastName == ''){
    this.toastr.warning('Please Enter LastName')
    return;
  }
  if(this.input.email == undefined || this.input.email == ''){
    this.toastr.warning('Please Enter Email')
    return;
  }
  if(this.input.password == undefined || this.input.password == ''){
    this.toastr.warning('Please Enter Password')
    return;
  }
  if(this.input.phone == undefined){
    this.toastr.warning('Please Enter Phone')
    return;
  }
  if(this.input.birthDate == undefined || this.input.birthDate == ''){
    this.toastr.warning('Please Enter BirthDate')
    return;
  }
  this.spinner.show()
  this.backend.Register(this.input).subscribe(res=>{
    this.spinner.hide()
    this.toastr.success('New Account has been Created')
    this.router.navigate([''])
  },err=>{
    this.spinner.hide()
    this.toastr.error('Failed To Create Account')
  })

}

}
