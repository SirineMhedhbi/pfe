import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  offer
  company
  isLoggedIn$: Observable<boolean>;

  role

  constructor(private jobsService: JobsService, private router: ActivatedRoute, private route: Router, private companyService: CompanyService, private toastr: ToastrService,private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.roleUser.subscribe(value=>{

      this.role = value
    })

    console.log(this.role)
    this.jobsService.showJob(this.router.snapshot.paramMap.get('id')).subscribe((res: any) => {

      this.offer = res
      console.log(this.offer)
    })


  }
  checkTest(id) {
    this.jobsService.checkTest(this.router.snapshot.paramMap.get('id')).subscribe((res: any) => {
      if (res.success) {
        this.route.navigate(['/candidat-test/', + id]);
      } else {
        this.toastr.info(res.message, '');
      }
    })



  }

}
