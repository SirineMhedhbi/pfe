import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }

  addEducation(education) {
    return this.http.post('/educations/create',
      {
        "title": education.title,
        "degree": education.degree,
        "institute": education.institute,
        "begin_date": education.begin_date,
        "end_date": education.end_date,
      })
  }

  userEducations(){
    return this.http.get('/educations/index')
  }
 

  deleteEducation(id){
    return this.http.delete('/educations/destroy/'+ id)
  }

  editEducation(education){
    return this.http.put('/educations/update/'+ education.id,
    {
        "title": education.title,
        "degree": education.degree,
        "institute": education.institute,
        "begin_date": education.begin_date,
        "end_date": education.end_date,
    })
  }
}
