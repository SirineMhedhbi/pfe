import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { PostAJobComponent } from '../post-a-job/post-a-job.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';





@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit {
  role
  isLoggedIn$: Observable<boolean>;
  lastusers
  lastcompanies
  newoffers
  recentoffers
  internoffers
  fulltimeoffers
  parttimeoffers
  categories

  constructor(private authService: AuthService, private usersService: UsersService, private router: Router, private companyService: CompanyService, private jobService: JobsService) {
    this.usersService.candidatLast().subscribe((res: any) => {

      this.lastusers = res.lastusers
      console.log(this.lastusers)


    })
    this.companyService.companyLast().subscribe((res: any) => {
      this.lastcompanies = res.lastcompanies
      console.log(this.lastcompanies)


    })

    this.companyService.getCategories().subscribe((res: any) => {
      this.categories = res
    })
  }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.roleUser.subscribe(value => {

      this.role = value
    })

    console.log(this.role)

    this.jobService.recentOffers().subscribe((res: any) => {
      this.newoffers = res.new_offers
      this.recentoffers = res.recent_offers
      this.internoffers = res.intern_offers
      this.fulltimeoffers = res.fulltime_offers
      this.parttimeoffers = res.parttime_offers

      console.log(res)


    })


  }
  postJob() {
    if (this.isLoggedIn$ && this.role == 'company') {
      this.router.navigate(['post-a-job']);
    }
    else {
      this.router.navigate(['create-account']);

    }
  }
  apply() {
    this.router.navigate(['job-list']);

  }

}
