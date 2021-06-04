import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  constructor(private http: HttpClient) { }

  addJob(job) {
    console.log(job)
    
    return this.http.post('/offers/create',
      {
        "title":job.offer.title,
        "category":job.offer.category,
        "company_name":job.offer.company_name,
        "location":job.offer.location,
        "offer_type":job.offer.offer_type,
        "job_experience":job.offer.job_experience,
        "description":job.offer.description,
        "job_salary":job.offer.job_salary,
        "job_time":job.offer.job_time,
      })
  }

  userJobs(){
    
    return this.http.get('/offers/index')
  }

  deleteJob(id){
    return this.http.delete('/offers/destroy/'+ id)
  }

  editJob(job,id){
    console.log(job)
    return this.http.put('/offers/update/'+ id,
    {
      "title":job.title,
      "category":job.category,
      "company_name":job.company_name,
      "location":job.location,
      "offer_type":job.offer_type,
      "job_experience":job.job_experience,
      "description":job.description,
      "job_salary":job.job_salary,
      "job_time":job.job_time,
      
    })
  }
  showJob (id){
    return this.http.get('/offers/show/'+id);

  }
}


