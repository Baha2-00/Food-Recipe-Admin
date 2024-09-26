import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  IsloggedIn :boolean = false;

  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService) { }
    ngOnInit(){
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')
    if(userId != null && token!= null){
      if(userId == 'none' && token =='none'){
        this.IsloggedIn=true;
      }else{
        this.IsloggedIn=true;
      }
    }
  }
  NaivageteToLogin(){
    this.router.navigate(['/SignIn'])
  }

  Logout(){
      this.spinner.show();
      this.backend.Logout();
  }

}
