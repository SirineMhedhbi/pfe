import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import {
  Router, ActivatedRouteSnapshot,
  CanActivate, RouterStateSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);
  public role = new BehaviorSubject<string>(localStorage.getItem("role") || "");


  constructor(private http: HttpClient, private router: Router) { }
  // JSON header
  jsonHeader = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };



  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  get roleUser() {
    return this.role.asObservable(); // {2}
  }

  isAthenticated() {
    return isNullOrUndefined(localStorage.getItem('cl'))

  }

  signUp(registration) {
    return this.http.post('/api/v1/auth',
      // body content - required args can be seen in the Busywork function
      {
        "email": registration.email,
        "password": registration.password,
        "confirm_success_url": environment.baseFrontUrl + "/login",
        "role": registration.role,
        "phone": registration.phone,
        "gender": registration.gender,
        "address": registration.address,
        "name": registration.name,
        "nickname": registration.nickname,
        "birthday": registration.birthday,
        "company_id": registration.company_id,
        "description": registration.description,
        "post": registration.post,
        "avatar": registration.image,
        "uploaded_cv": registration.uploaded_cv,

      },
      this.jsonHeader
    );
  }

  signIn(registration) {
    return this.http.post('/api/v1/auth/sign_in',
      {
        "email": registration.email,
        "password": registration.password,
        "password_confirmation": registration.password,
      }
      , { observe: 'response' }
    );

  }

  googleSignIn(user){
    let stirng_user = JSON.stringify(user)
    return this.http.get(`/api/v1/auth/google_oauth2/callback?user=${stirng_user}`)
  }

  logout() {                            // {4}
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    localStorage.clear()
  }
  changePassword(registration) {
    return this.http.put('/api/v1/auth/password',

      {
        "current_password": registration.current_password,
        "password": registration.new_password,
        "password_confirmation": registration.password_confirmation,
      }
    )

  }
  sendRecoverPassword(registration) {
    return this.http.post('/api/v1/auth/password',

      {
        "email": registration.email,
        "redirect_url": environment.baseFrontUrl + "/reset/password",
      }
    )

  }
  resetPassword(registration,params) {
    return this.http.put('/api/v1/auth/password' + params,

      {
        "password": registration.password,
        "password_confirmation": registration.password_confirmation,
      }
    )

  }
}


