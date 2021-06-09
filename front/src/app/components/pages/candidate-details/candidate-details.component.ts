import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';
import { LinksService } from 'src/app/services/links.service';
import { SkillsService } from 'src/app/services/skills.service';
import { UsersService } from 'src/app/services/users.service';
import { WorkService } from 'src/app/services/work.service';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {

  education={title:"",degree: "", institute:"", year:""}
  educations=[]
  skill={name:"",pourcentage:50}
  skills
  link
  links
  infos 
  user
  works
  

  constructor(private usersService: UsersService,private educationService: EducationService,private skillsService: SkillsService,private linksService: LinksService,private router: ActivatedRoute,private route:Router,private worksService: WorkService) { }

  ngOnInit(): void {
  //   this.usersService.candidatList().subscribe((res:any)=>{
    
  //     this.users=res.users
  //     console.log(this.users)

  // })


  
  this.usersService.cvUser(this.router.snapshot.paramMap.get('id')).subscribe((res:any)=>{
    console.log(res)
    this.user=res.user
    if (res.links) {
      this.links=res.links[0]

    }
    console.log(this.links)
    this.educations=res.educations
    console.log(this.educations)
    this.skills=res.skills
    console.log(this.skills)
    this.works=res.works
    console.log(this.works)





  })
  }

}




