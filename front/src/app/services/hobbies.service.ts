import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HobbiesService {

  constructor(private http: HttpClient) { }
  addHobbie(hobbie) {
    return this.http.post('/hobbies/create',
      {
        "name": hobbie.name,
      })
  }

  userHobbies(){
    return this.http.get('/hobbies/index')
  }
 

  deleteHobbie(id){
    return this.http.delete('/hobbies/destroy/'+ id)
  }

  editHobbie(hobbie){
    return this.http.put('/hobbies/update/'+ hobbie.id,
    {
      "name": hobbie.name,
    })
  }
}
