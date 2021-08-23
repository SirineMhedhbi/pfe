import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
        "title": job.offer.title,
        "category_id": job.offer.category_id,
        "company_name": job.offer.company_name,
        "location": job.offer.location,
        "offer_type": job.offer.offer_type,
        "job_experience": job.offer.job_experience,
        "description": job.offer.description,
        "job_salary": job.offer.job_salary,
        "job_time": job.offer.job_time,
        "qualification": job.offer.qualification,
        "offerSkills": job.offer.offerSkills,
        "contract": job.offer.contract,
        "lat": job.offer.lat,
        "lng": job.offer.lng,

      })
  }

 

  userJobs(q) {

    return this.http.get('/offers/index?query=' + q)
  }

  deleteJob(id) {
    return this.http.delete('/offers/destroy/' + id)
  }

  editJob(job, id) {
    console.log(job)
    return this.http.put('/offers/update/' + id,
      {
        "title": job.title,
        "category": job.category,
        "company_name": job.company_name,
        "location": job.location,
        "offer_type": job.offer_type,
        "job_experience": job.job_experience,
        "description": job.description,
        "job_salary": job.job_salary,
        "job_time": job.job_time,
        "qualification": job.qualification,
        "offerSkills": job.offerSkills,
        "contract": job.contract,
        "lat": job.lat,
        "lng": job.lng,

      })
  }
  showJob(id) {
    return this.http.get('/offers/show/' + id);
  }
  offersList(q) {
    return this.http.get('/offers/offer?query=' + q,)
  }
  recentOffers(){
    return this.http.get('/offers/recent',)
  }

  addTest(test,id){
    return this.http.post('/test/validate/' + id,
    {
      "test_offer":test,
    })
  }
  showTest(id){
    return this.http.get('/test/show/' + id);
  }
  addquestion(question,id){
    return this.http.post('/test/addquestion/' + id,
    {
      "question":question,
    } )
  }
  deleteQuestion(id){
    return this.http.delete('/test/destroy/' + id)
  }
  editQuestion(question,id){
    return this.http.put('/test/updatequestion/' + +id,
    {
      "question_content":question,

    } )

  }
  editAnswer(answer,id){
    return this.http.put('/test/updateanswer/' + +id,
    {
      "answer_content":answer,

    } )

  }
  checkTest(id) {
    return this.http.get('/test/checktest/' + id);
  }

  testresult(tab, id_test){
    return this.http.post('/test/testresult/'+ id_test, {tab});
  }

  addRemoveFavoriteJobs(id, answer){
    return this.http.post('/offers/favorite/'+ id, {answer});
  }

  getFavoriteJobs(q){
    return this.http.get('/offers/favorite/jobs?query=' + q);
  }



}


