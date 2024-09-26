import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { MainComponent } from './Pages/Pages/main/main.component';
import { CategoryComponent } from './Pages/Pages/category/category.component';
import { CuisineComponent } from './Pages/Pages/cuisine/cuisine.component';
import { DishsComponent } from './Pages/Pages/dishs/dishs.component';
import { DishsApproveComponent } from './Pages/Pages/dishs-approve/dishs-approve.component';
import { CreateCategoryComponent } from './Pages/Pages/create-category/create-category.component';
import { UpdateCategoryComponent } from './Pages/Pages/update-category/update-category.component';
import { CreateCuisineComponent } from './Pages/Pages/create-cuisine/create-cuisine.component';
import { UpdateCuisineComponent } from './Pages/Pages/update-cuisine/update-cuisine.component';
import { UpdateDishsComponent } from './Pages/Pages/update-dishs/update-dishs.component';
import { AdminUserProfileComponent } from './Pages/Pages/admin-user-profile/admin-user-profile.component';
import { UpdateAdminComponent } from './Pages/Pages/update-admin/update-admin.component';
import { UsersComponent } from './Pages/Pages/users/users.component';
import { NavbarComponent } from './SharedComponent/SharedComponent/navbar/navbar.component';
import { SideBarComponent } from './SharedComponent/SharedComponent/side-bar/side-bar.component';
import { FooterComponent } from './SharedComponent/SharedComponent/footer/footer.component';
import { ConfirmDialogComponent } from './SharedComponent/SharedComponent/confirm-dialog/confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppComponent } from './base-component/app.component';
import { HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FormsModule} from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule} from '@angular/material/icon';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatRadioModule} from '@angular/material/radio';
import { MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule} from '@angular/material/input';
import { MatSortModule} from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { CreateDishComponent } from './Pages/Pages/create-dish/create-dish.component';
import { SignInComponent } from './Pages/Pages/sign-in/sign-in.component';
import { SignUpComponent } from './Pages/Pages/sign-up/sign-up.component';
import { ErrorComponent } from './Pages/Pages/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    CategoryComponent,
    CuisineComponent,
    DishsComponent,
    DishsApproveComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    CreateCuisineComponent,
    UpdateCuisineComponent,
    UpdateDishsComponent,
    AdminUserProfileComponent,
    UpdateAdminComponent,
    UsersComponent,
    NavbarComponent,
    SideBarComponent,
    FooterComponent,
    ConfirmDialogComponent,
    CreateDishComponent,
    SignInComponent,
    SignUpComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    CarouselModule,
    FormsModule,
    AccordionModule.forRoot(),
    PaginationModule,
    MatSlideToggleModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    MatTabsModule,
    MatToolbarModule,
    MatButtonModule,
    BsDropdownModule,
    MatTooltipModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
