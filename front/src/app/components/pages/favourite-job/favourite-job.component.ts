import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-favourite-job',
  templateUrl: './favourite-job.component.html',
  styleUrls: ['./favourite-job.component.scss']
})
export class FavouriteJobComponent implements OnInit {
  public job: string = "/favourite-job";
  public href: string = "";
  test

  constructor(private jobService: JobsService, private toastr: ToastrService,private router: ActivatedRoute,private route: Router) { }
  favoriteJobs = []
  ngOnInit(): void {
    this.href = this.route.url
    this.test = this.href.includes(this.job)
    this.router.queryParams
    .subscribe(params => {
      if (params.query) {
        this.jobService.getFavoriteJobs(params.query).subscribe((res: any) => {

          this.favoriteJobs = res
        })
      } else {
        this.jobService.getFavoriteJobs(null).subscribe((res: any) => {

          this.favoriteJobs = res
        })
      }
    })

  }
  addToFavorite(item){
    const offer = this.favoriteJobs.find(x=> x.id == item.id) 
    offer.is_favorite_job = !offer.is_favorite_job
    this.favoriteJobs = this.favoriteJobs.filter(x=> x.id != item.id) 
    this.jobService.addRemoveFavoriteJobs(item.id,offer.is_favorite_job).subscribe((res:any)=>{
      this.toastr.success(res.message, '');
    })
    
  }

}
