import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { UpdateCategoryDTO } from 'src/app/DTO/BackendDtos/UpdateCategoryDTO';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent {

  input:UpdateCategoryDTO = new UpdateCategoryDTO()
  attachement: File | undefined;

  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService ,public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCategoryDTO ) { }


    onFileSelected(event: any) {
      if (event.target.files && event.target.files[0]) {
        this.attachement = event.target.files[0];
      }
    }

    SaveInfo(){
    this.input.id  = this.data.id
    this.input.title = this.data.title
    this.input.description = this.data.description
    this.input.imageUrl=this.data.imageUrl
    if(this.input.title == undefined || this.input.title ==''){
      this.toastr.warning('Title Is Required')
      return;
    }
    if(this.input.description == undefined || this.input.description ==''){
      this.toastr.warning('Description Is Required')
      return;
    }
    if (this.attachement == undefined) {
      this.input.imageUrl = '';
    }else{
      this.spinner.show()
      this.backend.uploadImage(this.attachement).subscribe(res=>{
        this.spinner.hide();
        this.input.imageUrl = res
        this.spinner.show()
      this.backend.UpdateCategory(this.input).subscribe(res=>{
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
