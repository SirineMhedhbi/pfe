import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  form: FormGroup;
  user
  constructor(private usersService: UsersService,private fb: FormBuilder) {

    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      nickname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required])),
      birthday: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
    });
   }
    
   updateUser(){
    console.log(this.form.value )
    this.usersService.updateUser(this.form.value,this.user.user.id).subscribe(result =>{
      console.log(result)
    })

    


   }

  get f() { return this.form.controls; }
  ngOnInit(): void {
   
    this.usersService.ShowUser().subscribe(result =>{
      this.user=result

      this.form = this.fb.group({
        name: new FormControl(this.user.user.name, Validators.compose([Validators.required, Validators.minLength(3)])),
        nickname: new FormControl(this.user.user.nickname, Validators.compose([Validators.required, Validators.minLength(3)])),
        email: new FormControl(this.user.user.email, Validators.compose([Validators.required])),
        birthday: new FormControl(this.user.user.birthday, Validators.compose([Validators.required])),
        phone: new FormControl(this.user.user.phone, Validators.compose([Validators.required])),
        address: new FormControl(this.user.user.address, Validators.compose([Validators.required])),
        role: new FormControl(this.user.user.role, Validators.compose([Validators.required])),
        gender: new FormControl(this.user.user.gender, Validators.compose([Validators.required])),
      });
    
      console.log(this.user)
    })
    
    
  }

}
