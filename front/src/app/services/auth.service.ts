import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private router: Router ) { }

// JSON header
jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

  

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }


  isAthenticated(){
    return isNullOrUndefined(localStorage.getItem('cl'))
  
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
  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    localStorage.clear()
  }
}
