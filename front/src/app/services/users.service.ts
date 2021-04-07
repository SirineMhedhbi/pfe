import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  

  constructor(private http:HttpClient) {

   }
   updateUser(user ,id){
    return this.http.put('/users/update/'+id,
      // body content - required args can be seen in the Busywork function
      {
        "email":user.email,
        "password":user.password,
        "confirm_success_url":"/sdsd",
        "role":user.role,
        "phone": user.phone,
        "gender":user.gender,
        "address":user.address,
        "name":user.name,
        "nickname":user.nickname,
        "birthday":user.birthday,

    },)
  }
  jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};


  ShowUser (){
    return this.http.get('/users/show');

  }
}
