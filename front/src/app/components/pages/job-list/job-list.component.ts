import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  offers
  offer
  constructor(private jobsService: JobsService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.jobsService.offersList().subscribe((res: any) => {

      this.offers = res.offers
      console.log(this.offers)
    })
   
  }
}


