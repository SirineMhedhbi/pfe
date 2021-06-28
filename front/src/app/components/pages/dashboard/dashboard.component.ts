import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user
  id
  form: FormGroup;

  constructor(private fb: FormBuilder,private usersService: UsersService,private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    this.usersService.ShowUser().subscribe(result =>{
      this.user=result
      console.log(this.user)

  })


  this.form = this.fb.group({
    current_password: new FormControl('', Validators.compose([Validators.required])),
    new_password: new FormControl('', Validators.compose([Validators.required])),
    password_confirmation: new FormControl('', Validators.compose([Validators.required])),
  });

}

changePasswordCandidat() {
  this.authService.changePassword(this.form.value).subscribe(
    (result: any) => {
      this.toastr.success(result.message, '');
      this.form.reset()
    },
    (err:any)=>{
      this.toastr.error(err.error.errors.full_messages, '');
    }

  )
}

}
