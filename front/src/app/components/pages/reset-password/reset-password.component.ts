import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  form: FormGroup;

  params
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.form = this.fb.group({
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required),

    });
    this.params = window.location.href.substring(36)
  }
  get f() { return this.form.controls; }

  ngOnInit(): void {
  }
  submitForm() {
    this.authService.resetPassword(this.form.value, this.params)
      .subscribe(
        (result: any) => {
          this.form.reset();
          this.router.navigate(['/login'])
          this.toastr.success(result.message, '');
        }, (err: any) => {
          this.toastr.error(err.error.errors.full_messages[0], '');
        }
      )
  }

}