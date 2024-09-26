import { Component, Inject } from '@angular/core';
import { EditDishDTO } from 'src/app/DTO/BackendDtos/EditDishDTO';
import { MainComponent } from '../main/main.component';
import { MainService } from 'src/app/backend/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-dishs',
  templateUrl: './update-dishs.component.html',
  styleUrls: ['./update-dishs.component.css']
})
export class UpdateDishsComponent {
  input:EditDishDTO = new EditDishDTO()
  attachement: File | undefined;
  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService ,public dialogRef: MatDialogRef<UpdateDishsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditDishDTO ) { }

    onFileSelected(event: any) {
      if (event.target.files && event.target.files[0]) {
        this.attachement = event.target.files[0];
      }
    }

    SaveInfo(){
    this.input.id  = this.data.id
    this.input.image = this.data.image
    this.input.name = this.data.name
    this.input.description=this.data.description
    if(this.input.name == undefined || this.input.name ==''){
      this.toastr.warning('Title Is Required')
      return;
    }
    if(this.input.description == undefined || this.input.description ==''){
      this.toastr.warning('Description Is Required')
      return;
    }
    if (this.attachement == undefined) {
      this.input.image = '';
    }else{
      this.spinner.show()
      this.backend.uploadImage(this.attachement).subscribe(res=>{
        this.spinner.hide();
        this.input.image = res
        this.backend.UpdateDish(this.input).subscribe(res=>{
          this.spinner.hide()
          this.toastr.success('Updated Successfully')
          this.dialogRef.close()
        },err=>{
          this.spinner.hide()
          this.toastr.error('Failed To Update Dish')
          this.dialogRef.close(true)
        })
      },err=>{
        this.spinner.hide();
        return;
      })
    }
      
    }
    }

