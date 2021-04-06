import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

  jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

  getAccessToken(){
    return localStorage.getItem('user_access_token');
  }
  ShowUser (){
    return this.http.get('/users/show');

  }
}
