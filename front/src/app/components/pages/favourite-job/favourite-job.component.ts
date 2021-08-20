import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-favourite-job',
  templateUrl: './favourite-job.component.html',
  styleUrls: ['./favourite-job.component.scss']
})
export class FavouriteJobComponent implements OnInit {
  public href: string = "";
  public job :string ="/favourite-job";
  test 

  constructor(private jobService: JobsService, private toastr: ToastrService,private route:Router) { }
  favoriteJobs = []
  ngOnInit(): void { 
    this.href = this.route.url
    console.log(this.href)
    this.test=this.href.includes(this.job)
    console.log(this.test)


    this.jobService.getFavoriteJobs().subscribe((res:any)=>{
      console.log(res)
      this.favoriteJobs = res
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
