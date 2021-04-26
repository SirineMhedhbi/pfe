import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(private http: HttpClient) { }

  addSkill(skill) {
    console.log(skill)
    return this.http.post('/skills/create',
      {
        "name": skill.name,
        "pourcentage": skill.pourcentage,
      })
  }

  userSkills(){
    return this.http.get('/skills/index')
  }

  deleteSkill(id){
    return this.http.delete('/skills/destroy/'+ id)
  }

  editSkill(skill){
    return this.http.put('/skills/update/'+ skill.id,
    {
      "name": skill.name,
      "pourcentage": skill.pourcentage,
    })
  }

}
