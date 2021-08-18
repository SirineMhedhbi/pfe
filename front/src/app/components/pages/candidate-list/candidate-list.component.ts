import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';
import { LinksService } from 'src/app/services/links.service';
import { SkillsService } from 'src/app/services/skills.service';
import { UsersService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
  users
  educations
  skills
  link
  filePath
  constructor(private usersService: UsersService, private educationService: EducationService, private skillsService: SkillsService, private linksService: LinksService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.usersService.candidatList().subscribe((res: any) => {

      this.users = res.users
      console.log(this.users)
      if (this.users.users.image) {
        this.filePath = environment.baseUrl + this.users.users.image
      }
     
    })
    


    // this.usersService.cvUser(this.router.snapshot.paramMap.get('id')).subscribe((res:any)=>{
    //   this.educations = res.educations
    // })
    // this.skillsService.userSkills().subscribe((res:any)=>{
    //   this.skills = res.skills
    // })

    // this.linksService.userLinks().subscribe((res:any)=>{
    //   if (res.link){
    //   this.link = res.link
    //   console.log(res.link)}
    //   console.log(this.link)
    // })



  }

}
