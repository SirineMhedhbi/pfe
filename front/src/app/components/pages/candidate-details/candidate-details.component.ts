import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';
import { HobbiesService } from 'src/app/services/hobbies.service';
import { LinksService } from 'src/app/services/links.service';
import { SkillsService } from 'src/app/services/skills.service';
import { UsersService } from 'src/app/services/users.service';
import { WorkService } from 'src/app/services/work.service';
import { environment } from 'src/environments/environment';



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
  hobbies
  filePath
  @Input() id;

  public href: string = "";
  public candidat :string ="/candidate-details";
  test 
  

  constructor(private usersService: UsersService,private educationService: EducationService,private skillsService: SkillsService,private linksService: LinksService,private router: ActivatedRoute,private route:Router,private worksService: WorkService, private hobbiesService : HobbiesService) { }

  ngOnInit(): void {
    this.href = this.route.url
    console.log(this.href)
    this.test=this.href.includes(this.candidat)
    console.log(this.test)
  //   this.usersService.candidatList().subscribe((res:any)=>{
    
  //     this.users=res.users
  //     console.log(this.users)

  // })


  
  this.usersService.cvUser(this.router.snapshot.paramMap.get('id')|| this.id).subscribe((res:any)=>{
    console.log(res)
    this.user=res.user
    if (this.user.image) {
      this.filePath = environment.baseUrl + this.user.image
    }
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
    this.hobbies=res.hobbies
    console.log(this.hobbies)



  })
  
  }
  

}




