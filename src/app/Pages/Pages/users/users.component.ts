import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/backend/main.service';
import { GetAllUsersDTO } from 'src/app/DTO/BackendDtos/GetAllUsersDTO';
import { UpdateUserDTO } from 'src/app/DTO/BackendDtos/UpdateUserDTO';
import { UpdateAdminComponent } from '../update-admin/update-admin.component';
import { ConfirmDialogData } from 'src/app/DTO/confirmDialog/conifrmdialog';
import { ConfirmDialogComponent } from 'src/app/SharedComponent/SharedComponent/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'phone',
    'role',
    'creationDate',
    'isDeleted',
    'Actions',
  ];
  dataSource: MatTableDataSource<GetAllUsersDTO>;
  users: GetAllUsersDTO[] = [];

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
      this.backend.GetAllUsers().subscribe(
        (res) => {
          this.spinner.hide();
          this.users = res;
          this.dataSource.data = this.users;
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
  


    CreateNewAdmin(){
      this.router.navigate(['SignUp']);
    }

    DeleteUser(userId: number){
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
          this.backend.DeleteUser(userId).subscribe(
            (res) => {
              this.spinner.hide();
              this.toastr.success('deleted succefully');
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
