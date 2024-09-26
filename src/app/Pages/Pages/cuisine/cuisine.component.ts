import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { GetAllCuisine } from 'src/app/DTO/BackendDtos/GetAllCuisine';
import { UpdateCuisineDTO } from 'src/app/DTO/BackendDtos/UpdateCuisineDTO';
import { UpdateCuisineComponent } from '../update-cuisine/update-cuisine.component';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/SharedComponent/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from 'src/app/DTO/confirmDialog/conifrmdialog';

@Component({
  selector: 'app-cuisine',
  templateUrl: './cuisine.component.html',
  styleUrls: ['./cuisine.component.css']
})
export class CuisineComponent {

  displayedColumns: string[] = [
    'id',
    'name',
    'desc',
    'isDeleted',
    'Actions',
  ];
  dataSource: MatTableDataSource<GetAllCuisine>;
  Cuisine: GetAllCuisine[] = [];

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
      this.backend.GetAllCusines().subscribe(
        (res) => {
          this.spinner.hide();
          this.Cuisine = res;
          this.dataSource.data = this.Cuisine;
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
  


    CreateNewCuisine(){
      this.router.navigate(['/Create-Cuisine']);
    }

    EditCuisine(item:UpdateCuisineDTO){
      this.dialog.open(UpdateCuisineComponent, {
        width: '700px',
        data:item
      });
    }

    DeleteCuisine(cuisId: number){
      let info = new ConfirmDialogData(
        'Are You Sure ?',
        'Are You Want To Delete This Cuisine'
      );
      const dialogres = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: info,
      });
  
      dialogres.afterClosed().subscribe((result) => {
        if (result) {
          this.spinner.show();
          this.backend.DeleteCuisine(cuisId).subscribe(
            (res) => {
              this.spinner.hide();
              this.toastr.success('deleted successfully');
              this.spinner.show();
      this.backend.GetAllCusines().subscribe(
        (res) => {
          this.spinner.hide();
          this.Cuisine = res;
          this.dataSource.data = this.Cuisine;
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
