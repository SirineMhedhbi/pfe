import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  offers = []
  offer
  constructor(private jobsService: JobsService, private router: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.queryParams
    .subscribe(params => {
      if (params.query) {
        this.jobsService.offersList(params.query).subscribe((res: any) => {

          this.offers = res
          console.log(this.offers)
        })
      } else {
        this.jobsService.offersList(null).subscribe((res: any) => {

          this.offers = res
          console.log(this.offers)
        })
      }
    })
    
   
  }
  addToFavorite(item){
    const offer = this.offers.find(x=> x.id == item.id) 
    offer.is_favorite_job = !offer.is_favorite_job
    this.jobsService.addRemoveFavoriteJobs(item.id,offer.is_favorite_job).subscribe((res:any)=>{
      this.toastr.success(res.message, '');
    })
    
  }
}


