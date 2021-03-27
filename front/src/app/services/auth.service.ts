import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient ) { }

// JSON header
jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

  getAccessToken(){
    return localStorage.getItem('user_access_token');
  }


  signUp(registration){
    return this.http.post('/api/v1/auth',
      // body content - required args can be seen in the Busywork function
      {
        "email":registration.email,
        "password":registration.password,
        "confirm_success_url":"/sdsd",
        "role":registration.role,
        "phone": registration.phone,
        "gender":registration.gender,
        "address":registration.address,
        "name":registration.name,
        "nickname":registration.nickname,
        "birthday":registration.birthday,
    },
      this.jsonHeader
    );
  }
  signIn (registration){
    return this.http.post('/api/v1/auth/sign_in',
    {
      "email":registration.email,
      "password":registration.password,
      "password_confirmation":registration.password,
    }
    ,{ observe: 'response'}
    );

  }
}
