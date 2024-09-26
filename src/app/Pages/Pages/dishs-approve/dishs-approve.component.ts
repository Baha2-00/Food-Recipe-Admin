import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { EditDishDTO } from 'src/app/DTO/BackendDtos/EditDishDTO';
import { GetAllDishesDTO } from 'src/app/DTO/BackendDtos/GetAllDishesDTO';
import { UpdateDishsComponent } from '../update-dishs/update-dishs.component';
import { ConfirmDialogData } from 'src/app/DTO/confirmDialog/conifrmdialog';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/SharedComponent/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dishs-approve',
  templateUrl: './dishs-approve.component.html',
  styleUrls: ['./dishs-approve.component.css']
})
export class DishsApproveComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'desc',
    'ingredientName',
    'quantity',
    'preparingStepsDescription',
    'isDeleted',
    'Actions',
  ];
  dataSource: MatTableDataSource<GetAllDishesDTO>;
  dish: GetAllDishesDTO[] = [];

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
      this.backend.GetAllDishesWithapprove().subscribe(
        (res) => {
          this.spinner.hide();
          this.dish = res;
          this.dataSource.data = this.dish;
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

    Approve(dishId: number){
      let info = new ConfirmDialogData(
        'Are You Sure ?',
        'Do You Want To Approve This Dish'
      );
      const dialogres = this.dialog.open(ConfirmDialogComponent, {
        width: '400px',
        data: info,
      });
  
      dialogres.afterClosed().subscribe((result) => {
        if (result) {
          this.spinner.show();
          this.backend.AcceptDish(dishId).subscribe(
            (res) => {
              this.spinner.hide();
              this.toastr.success('Accepted successfully');
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
