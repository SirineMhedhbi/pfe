import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';


@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  offer
  company

  constructor(private jobsService: JobsService,private router: ActivatedRoute,private route: Router ,private companyService: CompanyService) { }

  ngOnInit(): void {
    this.jobsService.showJob(this.router.snapshot.paramMap.get('id')).subscribe((res: any) => {

      this.offer = res
      console.log(this.offer)
    })

   
  }
  checkTest(id){
    this.jobsService.checkTest(this.router.snapshot.paramMap.get('id')).subscribe((res: any) => {
      console.log(res)
      console.log(res.message)  
    if (res.message) {
      this.route.navigate(['/candidat-test/', + id]);
      
    }
    })

   

  }

}
