import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplyService {

  constructor(private http: HttpClient) { }

  candidatList(id,filter) {
    return this.http.post('/apply/candidatlist/' + id,{
      filter

    })
  }
  acceptRefuse(id,status){
    return this.http.get('/apply/acceptorrefuse/' + id + "/" + status)
  }

  getMyapplies(){
    return this.http.get('/apply/my/applies')
  }

  removeApply(id){
    return this.http.delete('/apply/delete/' + id)
  }

}
