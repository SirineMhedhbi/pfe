import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private http: HttpClient) { }
  addWork(work) {
    return this.http.post('/works/create',
      {
        "title": work.title,
        "begin_date": work.begin_date,
        "end_date": work.end_date,
        "company": work.company,
        "description": work.description,

      })
  }

  userWorks() {
    return this.http.get('/works/index')
  }


  deleteWork(id) {
    return this.http.delete('/works/destroy/' + id)
  }

  editWork(work) {
    return this.http.put('/works/update/' + work.id,
      {
        "title": work.title,
        "begin_date": work.begin_date,
        "end_date": work.end_date,
        "company": work.company,
        "description": work.description,
      })
  }
}
