import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { UpdateCategoryDTO } from 'src/app/DTO/BackendDtos/UpdateCategoryDTO';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/SharedComponent/confirm-dialog/confirm-dialog.component';
import { GetAllCategories } from 'src/app/DTO/BackendDtos/GetAllCategories';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from 'src/app/backend/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from 'src/app/DTO/confirmDialog/conifrmdialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {

  displayedColumns: string[] = [
    'id',
    'name',
    'desc',
    'isDeleted',
    'Actions',
  ];
  dataSource: MatTableDataSource<GetAllCategories>;
  CategoryDTO: GetAllCategories[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild(MatSort) sort: MatSort;

  constructor(private backend:MainService , private router:Router, private toastr:ToastrService ,
    private spinner:NgxSpinnerService,public dialog: MatDialog) {

    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();
     }


     ngOnInit(){
      this.spinner.show();
      this.backend.GetAllCategories().subscribe(
        (res) => {
          this.spinner.hide();
          this.CategoryDTO = res;
          this.dataSource.data = this.CategoryDTO;
        },
        (err) => {
          this.spinner.hide();
        }
      );
    
     }

     ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }


    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    LogoutFuncationaity() {
      this.spinner.show();
      this.backend.Logout();
    }

    backToHome() {
      this.router.navigate(['/Admin-Details']);
    }
  
    CreateNewCategory(){
      this.router.navigate(['/Create-Category']);
    }

    EditDish(item:UpdateCategoryDTO){
      this.dialog.open(UpdateCategoryComponent, {
        width: '700px',
        data:item
      });
    }


    DeleteCategory(cateId: number){
      let info = new ConfirmDialogData(
        'Are You Sure ?',
        'Are You Want To Delete This Category'
      );
      const dialogres = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: info,
      });
  
      dialogres.afterClosed().subscribe((result) => {
        if (result) {
          this.spinner.show();
          this.backend.DeleteCategory(cateId).subscribe(
            (res) => {
              this.spinner.hide();
              this.toastr.success('deleted successfully');
              this.spinner.show();
      this.backend.GetAllCategories().subscribe(
        (res) => {
          this.spinner.hide();
          this.CategoryDTO = res;
          this.dataSource.data = this.CategoryDTO;
        },
        (err) => {
          this.spinner.hide();
        }
      );
            },
            (err) => {
              this.spinner.hide();
              this.toastr.error('delete failed');
            }
          );
        } else {
        }
      });

    }

}
