import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from 'src/app/services/education.service';
import { SkillsService } from 'src/app/services/skills.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  form: FormGroup;
  user
  education={title:"",degree: "", institute:"", year:""}
  educations=[  ]
  skill={name:"",pourcentage:50}
  skills=[]
  constructor(private usersService: UsersService,private fb: FormBuilder,private educationService: EducationService,private skillsService: SkillsService) {

    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      nickname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required])),
      birthday: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
    });
   }
    
   updateUser(){
    console.log(this.form.value )
    this.usersService.updateUser(this.form.value,this.user.user.id).subscribe(result =>{
      console.log(result)
    })

    


   }
  


  get f() { return this.form.controls; }
  ngOnInit(): void {
   
    this.usersService.ShowUser().subscribe(result =>{
      this.user=result

      this.form = this.fb.group({
        name: new FormControl(this.user.user.name, Validators.compose([Validators.required, Validators.minLength(3)])),
        nickname: new FormControl(this.user.user.nickname, Validators.compose([Validators.required, Validators.minLength(3)])),
        email: new FormControl(this.user.user.email, Validators.compose([Validators.required])),
        birthday: new FormControl(this.user.user.birthday, Validators.compose([Validators.required])),
        phone: new FormControl(this.user.user.phone, Validators.compose([Validators.required])),
        address: new FormControl(this.user.user.address, Validators.compose([Validators.required])),
        role: new FormControl(this.user.user.role, Validators.compose([Validators.required])),
        gender: new FormControl(this.user.user.gender, Validators.compose([Validators.required])),
      });
    
      console.log(this.user)
    })
    
    this.educationService.userEducations().subscribe((res:any)=>{
      this.educations = res.educations
    })
    this.skillsService.userSkills().subscribe((res:any)=>{
      this.skills = res.skills
    })
  }

  editEducation(item){

    this.educationService.editEducation(item).subscribe((res:any)=>{
      console.log(res)

    })
  }
  addEducation(education){
    this.educationService.addEducation(education).subscribe((res:any) =>{
     this.educations.push(res.education)
     this.education = {title:"",degree: "", institute:"", year:""}
    })
    
  }
  removeEducation(id){
    this.educationService.deleteEducation(id).subscribe((res:any)=>{
      let index = this.educations.findIndex(x => x.id == id);
      this.educations = this.educations.filter(function(el) { return el.id != id });
      console.log(this.educations)
    })
   
  }
  editSkill(item){
      console.log(item)
    this.skillsService.editSkill(item).subscribe((res:any)=>{
      console.log(res)

    })

}

addSkill(skill){
  this.skillsService.addSkill(skill).subscribe((res:any) =>{
   this.skills.push(res.skill)
   this.skill = {name: "", pourcentage:50}
   console.log(res.skill)
  })
  
}
removeSkill(id){
  this.skillsService.deleteSkill(id).subscribe((res:any)=>{
    // let index = this.skills.findIndex(x => x.id == id);
    this.skills = this.skills.filter(function(el) { return el.id != id });
    console.log(this.skills)
  })
 
}
}