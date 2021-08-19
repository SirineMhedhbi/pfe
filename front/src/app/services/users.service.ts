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
        "description":user.description,
        "post":user.post,
        lat: user.lat,
        lng: user.lng,
        "avatar":user.image,




    },)
  }
  jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};


  ShowUser (){
    return this.http.get('/users/show');

  }

  candidatList(){
    return this.http.get('/users/index',)
  }
  cvUser(id){
    return this.http.get('/cvs/cvUser/'+ id)
  }
  candidatLast(){
    return this.http.get('/users/indexlast',)
  }
  downloadCv(html){
    return this.http.post('/users/downloadCv',{html:html})
  }
}
