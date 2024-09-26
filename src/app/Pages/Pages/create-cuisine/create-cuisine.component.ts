import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { CreateCuisineDTO } from 'src/app/DTO/BackendDtos/CreateCuisineDTO';

@Component({
  selector: 'app-create-cuisine',
  templateUrl: './create-cuisine.component.html',
  styleUrls: ['./create-cuisine.component.css']
})
export class CreateCuisineComponent {

  input: CreateCuisineDTO = new CreateCuisineDTO();
  attachement: File | undefined;
  constructor(
    public backend: MainService,
    public tostr: ToastrService,
    public spinner: NgxSpinnerService,
    public router: Router
  ) {}
  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.attachement = event.target.files[0];
    }
  }
  SaveInfo() {
    if (this.input.title == undefined || this.input.title == '') {
      this.tostr.warning('Title Is Required');
      return;
    }
    if (this.input.description == undefined || this.input.description == '') {
      this.tostr.warning('Article Is Required');
      return;
    }
      if (this.attachement == undefined) {
        this.input.imageUrl = '';
      }else{
        this.spinner.show()
        this.backend.uploadImage(this.attachement).subscribe(res=>{
          this.spinner.hide();
          this.input.imageUrl = res
          this.backend.CreateCuisine(this.input).subscribe(
            (res) => {
              this.spinner.hide();
              this.tostr.success('Created Successfully');
              this.router.navigate(['/Cuisine']);
            },
            (err) => {
              this.spinner.hide();
              this.tostr.error('Failed To Create Cuisine');
            }
          );
        },err=>{
          this.spinner.hide();
          return;
        })
      }
    }
}
