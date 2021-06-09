import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company
  role 
  isLoggedIn$: Observable<boolean>;

  
 
  constructor(private authService: AuthService,private usersService: UsersService,private companyService: CompanyService,private jobsService: JobsService,private fb: FormBuilder,private router: ActivatedRoute,private route:Router) { 
   
  } 

  

  ngOnInit(): void {

  
    this.companyService.showCom(this.router.snapshot.paramMap.get('id')).subscribe(result =>{
    
      this.company=result
      console.log(result)
  })
  this.isLoggedIn$ = this.authService.isLoggedIn;
  this.authService.roleUser.subscribe(value=>{

    this.role = value
  })

  console.log(this.role)
}
}

   

