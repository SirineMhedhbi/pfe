import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  constructor(private http: HttpClient) { }

  addLink(link) {
    console.log(link)
    return this.http.post('/links/create',
      {
        "linkedin": link.linkedin,
        "facebook": link.facebook,
        "instagram":link.instagram,
        "github":link.github,
        "id":link.id || 0
      })
  }

  userLinks(){
    return this.http.get('/links/index')
  }

  deleteLink(id){
    return this.http.delete('/links/destroy/'+ id)
  }

  editLink(link){
    return this.http.put('/links/update/'+ link.id,
    {
      "linkedin": link.linkedin,
      "facebook": link.facebook,
      "instagram":link.instagram,
      "github":link.github,
    })
  }
}
