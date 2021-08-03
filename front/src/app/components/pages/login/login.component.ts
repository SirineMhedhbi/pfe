import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
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
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/']);
            }

            this.toastr.success('logged in succesfully', '');
          }
        }, (err: any) => {
          this.toastr.error(err.error.errors[0], '');
        }
      )
  }



}
