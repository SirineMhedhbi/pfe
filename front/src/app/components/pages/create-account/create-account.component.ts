import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  form: FormGroup;
constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  
}


signUpUser(){
  console.log(this.form.value )
  this.authService.signUp(this.form.value  ).subscribe(
    (result:any) => {
      if(result['status'] == 'success'){
        this.form.reset();
        this.router.navigate(['login']);
      }
    }
  )
}

get f() { return this.form.controls; }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      nickname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      birthday: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),


    });

  }

}
