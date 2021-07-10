import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import 'rxjs/add/operator/map'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.form = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }
  get f() { return this.form.controls; }

  ngOnInit(): void {
  }
  submitForm(){
    this.authService.sendRecoverPassword(this.form.value)
    .subscribe(
      (result: any) => {
          this.form.reset();
          this.router.navigate(['/'])
          this.toastr.success(result.message, '');
      },(err: any) => {
        this.toastr.error(err.error.errors[0], '');
      }
    )
  }

}
