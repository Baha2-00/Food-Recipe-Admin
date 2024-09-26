import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { GetUserDetailsDTO } from 'src/app/DTO/BackendDtos/GetUserDetailsDTO';
import { UpdateUserDTO } from 'src/app/DTO/BackendDtos/UpdateUserDTO';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent {
  file: File | undefined;
  input:UpdateUserDTO = new UpdateUserDTO()
  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService ,public dialogRef: MatDialogRef<UpdateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetUserDetailsDTO ) { }


  LogoutFuncationaity() {
    this.spinner.show();
    this.backend.Logout();
  }

  backToHome() {
    this.router.navigate(['']);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  SaveInfo(){
    this.input.id  = this.data.id
    this.input.firstName = this.data.firstName
    this.input.lastName = this.data.lastName
    this.input.phone = this.data.phone
    this.input.socicalMediaAccount = this.data.socicalMediaAccount
    this.input.profileImage=this.data.profileImage
    if(this.input.firstName == undefined || this.input.firstName ==''){
      this.toastr.warning('firstName Is Required')
      return;
    }
    if(this.input.lastName == undefined || this.input.lastName ==''){
      this.toastr.warning('lastName Is Required')
      return;
    }
    if(this.input.phone == undefined){
      this.toastr.warning('phone Is Required')
      return;
    }
    if(this.input.socicalMediaAccount == undefined || this.input.socicalMediaAccount ==''){
      this.toastr.warning('socicalMediaAccount Is Required')
      return;
    }
    if (this.file == undefined) {
      this.input.profileImage = '';
    }else{
      this.spinner.show()
      this.backend.uploadImage(this.file).subscribe(res=>{
        this.spinner.hide();
        this.input.profileImage = res
        this.backend.UpdateUser(this.input).subscribe(res=>{
          this.spinner.hide()
          this.toastr.success('Updated Successfully')
          this.dialogRef.close(true)
        },err=>{
          this.spinner.hide()
          this.toastr.error('Failed To Update Category')
          this.dialogRef.close()
        })
      },err=>{
        this.spinner.hide();
        return;
      })
    }

      
    }
}
