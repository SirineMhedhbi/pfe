import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies
  company 
  

  constructor(private usersService: UsersService,private companyService: CompanyService,private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.companyService.showCompany().subscribe((res:any)=>{
      this.companies=res.companies
      console.log(res)

    })
    }
  }
  

