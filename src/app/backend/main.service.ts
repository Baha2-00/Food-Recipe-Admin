import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GetAllCategories } from '../DTO/BackendDtos/GetAllCategories';
import { Observable } from 'rxjs';
import { GetAllCuisine } from '../DTO/BackendDtos/GetAllCuisine';
import { GetAllDishesDTO } from '../DTO/BackendDtos/GetAllDishesDTO';
import { GetAllUsersDTO } from '../DTO/BackendDtos/GetAllUsersDTO';
import { GetUserDetailsDTO } from '../DTO/BackendDtos/GetUserDetailsDTO';
import { UserDishDTO } from '../DTO/BackendDtos/UserDishDTO';
import { LoginDTO } from '../DTO/BackendDtos/LoginDTO';
import { SignInComponent } from '../Pages/Pages/sign-in/sign-in.component';
import { CreateNewAdminDTO } from '../DTO/BackendDtos/CreateNewAdminDTO';
import { CreateDishDTO } from '../DTO/BackendDtos/CreateDishDTO';
import { CreateCategoryDTO } from '../DTO/BackendDtos/CreateCategoryDTO';
import { CreateCuisineDTO } from '../DTO/BackendDtos/CreateCuisineDTO';
import { EditDishDTO } from '../DTO/BackendDtos/EditDishDTO';
import { UpdateUserDTO } from '../DTO/BackendDtos/UpdateUserDTO';
import { UpdateCategoryDTO } from '../DTO/BackendDtos/UpdateCategoryDTO';
import { UpdateCuisineDTO } from '../DTO/BackendDtos/UpdateCuisineDTO';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private baseURL : string ='https://localhost:44332'

  constructor(private http:HttpClient , private router:Router) { }


  GetAllCategories() : Observable <GetAllCategories[]>{
    return this.http.get<GetAllCategories[]>(`${this.baseURL}/api/Shared/GetAllCategories`)
  }

  GetAllCusines():Observable<GetAllCuisine[]> {
    return this.http.get<GetAllCuisine[]>(`${this.baseURL}/api/Shared/GetAllCuisines`)
  }

  GetAllDishes():Observable<GetAllDishesDTO[]> {
    return this.http.get<GetAllDishesDTO[]>(`${this.baseURL}/api/Shared/GetAllDishes`)
  }
  GetAllDishesWithapprove():Observable<GetAllDishesDTO[]> {
    return this.http.get<GetAllDishesDTO[]>(`${this.baseURL}/api/Admin/GetAllDishesWithApprove`)
  }
  GetAllUsers():Observable<GetAllUsersDTO[]> {
    return this.http.get<GetAllUsersDTO[]>(`${this.baseURL}/api/Admin/GetAllUsers`)
  }
  UserDetails(id:number):Observable<GetUserDetailsDTO> {
    return this.http.get<GetUserDetailsDTO>(`${this.baseURL}/api/Admin/GetUsersByid/${id}`)
  }
  GetUserDishByUserId(id:number):Observable<UserDishDTO[]> {
    return this.http.get<UserDishDTO[]>(`${this.baseURL}/api/User/GetUserDishByUserId?Id=${id}`)
  }

  Login(input:LoginDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/LoginToSite`,input,{headers,responseType:'text'})
  }

  Register(input:CreateNewAdminDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewAdmin`,input,{headers,responseType:'text'})
  }
  CreateCategory(input:CreateCategoryDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewCategory`,input,{headers,responseType:'text'})
  }
  CreateCuisine(input:CreateCuisineDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewCuisine`,input,{headers,responseType:'text'})
  }

  CreateDish(input:CreateDishDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Admin/CreateNewDish`,input,{headers,responseType:'text'})
  }

  UpdateCategory(input:UpdateCategoryDTO) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateCategory`,input,{headers,responseType:'text'})
  }
  UpdateCuisine(input:UpdateCuisineDTO) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateCuisine`,input,{headers,responseType:'text'})
  }

  UpdateDish(input:EditDishDTO) : Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/User/UpdateDish`,input,{headers,responseType:'text'})
  }

  UpdateUser(input:UpdateUserDTO): Observable<any>{
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateAdmin`,input,{headers,responseType:'text'})
  }


  DeleteCategory(categoryId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateCategoryActivation?Id=${categoryId}&value=true`,null,{headers,responseType:'text'})
  }

  DeleteCuisine(cuisineId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateCuisineActivation?Id=${cuisineId}&value=true`,null,{headers,responseType:'text'})
  }


  DeleteDish(dishId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/User/UpdateDishActivation?Id=${dishId}&value=true`,null,{headers,responseType:'text'})
  }

  AcceptDish(dishId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/User/UpdateDishActivation?Id=${dishId}&value=false`,null,{headers,responseType:'text'})
  }

  DeleteUser(userId:number): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.put(`${this.baseURL}/api/Admin/UpdateAdminActivation?Id=${userId}&value=true`,null,{headers,responseType:'text'})
  }


  Logout(){
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.router.navigate([''])

  }


  uploadImage(file: File) : Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });
    return this.http.post(`${this.baseURL}/api/Files/UploadImageAndGetURL`, formData, { headers, responseType: 'text' })
  }
  
}
