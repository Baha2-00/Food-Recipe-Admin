import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Pages/Pages/main/main.component';
import { CategoryComponent } from './Pages/Pages/category/category.component';
import { CreateCategoryComponent } from './Pages/Pages/create-category/create-category.component';
import { ErrorComponent } from './Pages/Pages/error/error.component';
import { UpdateCategoryComponent } from './Pages/Pages/update-category/update-category.component';
import { CuisineComponent } from './Pages/Pages/cuisine/cuisine.component';
import { CreateCuisineComponent } from './Pages/Pages/create-cuisine/create-cuisine.component';
import { UpdateCuisineComponent } from './Pages/Pages/update-cuisine/update-cuisine.component';
import { DishsComponent } from './Pages/Pages/dishs/dishs.component';
import { CreateDishComponent } from './Pages/Pages/create-dish/create-dish.component';
import { UpdateDishsComponent } from './Pages/Pages/update-dishs/update-dishs.component';
import { DishsApproveComponent } from './Pages/Pages/dishs-approve/dishs-approve.component';
import { AdminUserProfileComponent } from './Pages/Pages/admin-user-profile/admin-user-profile.component';
import { UsersComponent } from './Pages/Pages/users/users.component';
import { SignInComponent } from './Pages/Pages/sign-in/sign-in.component';
import { SignUpComponent } from './Pages/Pages/sign-up/sign-up.component';
import { ConfirmDialogComponent } from './SharedComponent/SharedComponent/confirm-dialog/confirm-dialog.component';
import { UpdateAdminComponent } from './Pages/Pages/update-admin/update-admin.component';

const routes: Routes = [
  {
    path:'',//Main Page
    component:SignInComponent
  },
  {
    path:'Category',
    component:CategoryComponent
  },
  {
    path:'Create-Category',
    component:CreateCategoryComponent
  },
  {
    path:'Update-Category',
    component:UpdateCategoryComponent
  },
  {
    path:'Cuisine',
    component:CuisineComponent
  },
  {
    path:'Create-Cuisine',
    component:CreateCuisineComponent
  },
  {
    path:'Update-Cuisine',
    component:UpdateCuisineComponent
  },
  {
    path:'Dish',
    component:DishsComponent
  },
  {
    path:'Create-Dish',
    component:CreateDishComponent
  },
  {
    path:'Update-Dish',
    component:UpdateDishsComponent
  },
  {
    path:'Dish-Approve',
    component:DishsApproveComponent
  },
  {
    path:'Admin-Details',
    component:AdminUserProfileComponent
  },
  {
    path:'Users',
    component:UsersComponent
  },
  {
    path:'Update-Admin',
    component:UpdateAdminComponent
  },
  {
    path:'main',
    component:MainComponent
  },
  {
    path:'SignUp',
    component:SignUpComponent
  },
  {
    path:'confirm-dialog',
    component:ConfirmDialogComponent
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'**',
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
