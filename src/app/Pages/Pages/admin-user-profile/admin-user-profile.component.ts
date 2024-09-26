import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { GetUserDetailsDTO } from 'src/app/DTO/BackendDtos/GetUserDetailsDTO';
import { UpdateUserDTO } from 'src/app/DTO/BackendDtos/UpdateUserDTO';
import { UpdateAdminComponent } from '../update-admin/update-admin.component';

@Component({
  selector: 'app-admin-user-profile',
  templateUrl: './admin-user-profile.component.html',
  styleUrls: ['./admin-user-profile.component.css']
})
export class AdminUserProfileComponent {
  dto : GetUserDetailsDTO = new GetUserDetailsDTO()

  constructor(private backend:MainService , private router:Router,public route : ActivatedRoute 
    , private toastr:ToastrService , private spinner:NgxSpinnerService,public dialog: MatDialog) {
    
     }

    ngOnInit(){
    this.spinner.show();
    let userId = localStorage.getItem('userId');
    if (userId != null)
      this.backend.UserDetails(parseInt(userId)).subscribe(
        (res) => {
          this.spinner.hide();
          this.dto = res;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    else this.spinner.hide();
    }

    UpdateProfile(item: GetUserDetailsDTO | undefined) {
      const dialogres = this.dialog.open(UpdateAdminComponent, {
      width: '1200px',
      data: item
    });
  }



}
