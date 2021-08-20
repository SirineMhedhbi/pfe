import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { ToastrService } from 'ngx-toastr';

import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService, private socialAuthService: SocialAuthService) {
    this.form = this.fb.group({
      username: new FormControl('email', Validators.required),
      password: new FormControl('password', Validators.required)
    });
  }
  get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });


  }

  signInUser() {
    console.log(this.form.value)
    this.authService.signIn(this.form.value)
      .subscribe(
        (result: any) => {
          if (result['status'] == 200) {

            console.log(result)
            localStorage.setItem("cl", result.headers.get("client"));
            localStorage.setItem("uid", result.headers.get("uid"));
            localStorage.setItem("access", result.headers.get("access-token"));
            localStorage.setItem("role", result.body.data.role);
            localStorage.setItem("id", result.body.data.id);
            this.authService.loggedIn.next(true);
            this.authService.role.next(localStorage.getItem("role"));
            this.form.reset();
            if (localStorage.getItem("role") == "admin") {
              window.location.href = 'http://localhost:3000/admin/users'
            } else {
              this.router.navigate(['/']);
            }

            this.toastr.success('logged in succesfully', '');
          }
        },(err: any) => {
          this.toastr.error(err.error.errors[0], '');
        }
      )
  }
  formmatted_data(data){
    console.log(data)
    return {   resource_class: 'User',
    provider : 'google_oauth2',
    uid : data.email  ,
    info : {
        name : data.firstName,
        email : data.email,
        nickname : data.lastName,
        avatar : data.photoUrl,
        role: "candidat"
    }
    
}

  }
  public signinWithGoogle () {
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
 
    this.socialAuthService.signIn(socialPlatformProvider)
    .then((userData) => {
      let formatted_user = this.formmatted_data(userData)
      console.log(formatted_user)
      this.authService.googleSignIn(formatted_user).subscribe((res:any)=>{

        console.log(res)
        localStorage.setItem("cl", res.client_id)
        localStorage.setItem("uid", res.uid);
        localStorage.setItem("access", res.auth_token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("id", res.id);
        this.authService.loggedIn.next(true);
        this.authService.role.next(localStorage.getItem("role"));
        if (res.oauth_registration) {
          this.toastr.success('logged in succesfully', ' You have to complete your profile informations please');
          this.router.navigate(['/profile']);
        } else {
          this.toastr.success('logged in succesfully', '');
          this.router.navigate(['/']);
          
        }
        
      })
       //on success
       //this will return user data from google. What you need is a user token which you will send it to the server
      //  this.sendToRestApiMethod(userData.idToken);
    });
 }



}
