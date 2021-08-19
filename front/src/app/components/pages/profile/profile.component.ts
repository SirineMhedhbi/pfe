import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EducationService } from 'src/app/services/education.service';
import { SkillsService } from 'src/app/services/skills.service';
import { LinksService } from 'src/app/services/links.service';
import { WorkService } from 'src/app/services/work.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HobbiesService } from 'src/app/services/hobbies.service';
import { environment } from 'src/environments/environment';





@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public href: string = "";
  public profil: string = "/profile";
  public Editor = ClassicEditor;
  test

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  form: FormGroup;
  user
  education = { title: "", degree: "", institute: "", begin_date: "", end_date:"" }
  educations = []
  skill = { name: "", pourcentage: 50 }
  skills = []
  link = { linkedin: "", facebook: "", instagram: "", github: "" }
  links = []
  role
  work = { title: "", begin_date: "", end_date: "", company: "", description: "" }
  works = []
  hobbie = {name: ""}
  hobbies = []
  filePath
  pdfFilePath

  constructor(private router: Router, private usersService: UsersService, private fb: FormBuilder, private educationService: EducationService, private skillsService: SkillsService, private linksService: LinksService, private worksService: WorkService, private authService: AuthService, private toastr: ToastrService, private hobbieService : HobbiesService) {

    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      nickname: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      email: new FormControl('', Validators.compose([Validators.required])),
      birthday: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl('', Validators.compose([Validators.required])),
      role: new FormControl('', Validators.compose([Validators.required])),
      gender: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl('', Validators.compose([Validators.required])),
      post: new FormControl('', Validators.compose([Validators.required])),
      lat: new FormControl('', Validators.compose([Validators.required])),
      lng: new FormControl('', Validators.compose([Validators.required])),

    });
  }


  ngOnInit(): void {

    this.usersService.ShowUser().subscribe(result => {
      this.user = result
      console.log(result)
      if (this.user.user.image) {
        this.filePath = environment.baseUrl + this.user.user.image
      }
      if (this.user.user.uploaded_cv_pdf) {
        this.pdfFilePath = environment.baseUrl + this.user.user.uploaded_cv_pdf
      }
      
      this.form = this.fb.group({
        name: new FormControl(this.user.user.name, Validators.compose([Validators.required, Validators.minLength(3)])),
        nickname: new FormControl(this.user.user.nickname, Validators.compose([Validators.required, Validators.minLength(3)])),
        email: new FormControl(this.user.user.email, Validators.compose([Validators.required])),
        birthday: new FormControl(this.user.user.birthday, Validators.compose([Validators.required])),
        phone: new FormControl(this.user.user.phone, Validators.compose([Validators.required])),
        address: new FormControl(this.user.user.address, Validators.compose([Validators.required])),
        role: new FormControl(this.user.user.role, Validators.compose([Validators.required])),
        gender: new FormControl(this.user.user.gender, Validators.compose([Validators.required])),
        description: new FormControl(this.user.user.description, Validators.compose([Validators.required])),
        post: new FormControl(this.user.user.post, Validators.compose([Validators.required])),
        lat: new FormControl(this.user.user.lat, Validators.compose([Validators.required])),
        lng: new FormControl(this.user.user.lng, Validators.compose([Validators.required])),
        image: new FormControl('', Validators.compose([Validators.required])),

      });

    })
    this.href = this.router.url
    this.test = this.href.includes(this.profil)
    this.authService.roleUser.subscribe(value => {

      this.role = value

      if (this.role != "company" && this.role != "admin") {
        this.educationService.userEducations().subscribe((res: any) => {
          this.educations = res.educations
        })

        this.hobbieService.userHobbies().subscribe((res: any) => {
          this.hobbies = res.hobbies
        })

        this.skillsService.userSkills().subscribe((res: any) => {
          this.skills = res.skills
        })

        this.linksService.userLinks().subscribe((res: any) => {
          if (res.link) {
            this.link = res.link
          }

        })

        this.worksService.userWorks().subscribe((res: any) => {
          this.works = res.works
        })
      }

    })



  }
  imagePreview(files) {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result
      this.form.patchValue({
        image: reader.result
      });
    }
    reader.readAsDataURL(file)
  }
  updateUser() {
    console.log(this.form.value)
    this.usersService.updateUser(this.form.value, this.user.user.id).subscribe(result => {
      console.log(result)
      this.toastr.success('Profile Updated', '');

      
    })


  }



  get f() { return this.form.controls; }

  editEducation(item) {

    this.educationService.editEducation(item).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Education Updated', '');


    })
  }
  addEducation(education) {
    this.educationService.addEducation(education).subscribe((res: any) => {
      this.educations.push(res.education)
      this.education = { title: "", degree: "", institute: "", begin_date: "", end_date: "" }
      this.toastr.success('Education added successfully', '');

    })

  }
  removeEducation(id) {
    this.educationService.deleteEducation(id).subscribe((res: any) => {
      let index = this.educations.findIndex(x => x.id == id);
      this.educations = this.educations.filter(function (el) { return el.id != id });
      console.log(this.educations)
      this.toastr.success('Remove successfully', '');

    })

  }
  editSkill(item) {
    console.log(item)
    this.skillsService.editSkill(item).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Skill Updated', '');


    })

  }

  addSkill(skill) {
    this.skillsService.addSkill(skill).subscribe((res: any) => {
      this.skills.push(res.skill)
      this.skill = { name: "", pourcentage: 50 }
      console.log(res.skill)
      this.toastr.success('Skill added successfully', '');

    })

  }
  removeSkill(id) {
    this.skillsService.deleteSkill(id).subscribe((res: any) => {
      // let index = this.skills.findIndex(x => x.id == id);
      this.skills = this.skills.filter(function (el) { return el.id != id });
      console.log(this.skills)
      this.toastr.success('Remove successfully', '');

    })

  }
  editLink(item) {
    console.log(item)
    this.linksService.editLink(item).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('LLink Updated', '');


    })

  }
  addLink(link) {
    this.linksService.addLink(link).subscribe((res: any) => {
      this.links.push(res.link)
      //  this.link = {linkedin: "", facebook:"", instagram:"", github:""}
      console.log(res.link)
      this.toastr.success('Link added successfully', '');

    })

  }

  removeLink(id) {
    this.linksService.deleteLink(id).subscribe((res: any) => {
      this.links = this.links.filter(function (el) { return el.id != id });
      console.log(this.links)
      this.toastr.success('Remove successfully', '');

    })

  }

  editWork(item) {

    this.worksService.editWork(item).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Work Updated', '');


    })
  }
  addWork(work) {
    this.worksService.addWork(work).subscribe((res: any) => {
      this.works.push(res.work)
      this.work = work = { title: "", begin_date: "", end_date: "", company: "", description: "" }
      this.toastr.success('Work added successfully', '');


    })

  }
  removeWork(id) {
    this.worksService.deleteWork(id).subscribe((res: any) => {
      let index = this.works.findIndex(x => x.id == id);
      this.works = this.works.filter(function (el) { return el.id != id });
      console.log(this.works)
      this.toastr.success('Remove successfully', '');

    })

  }

  addHobbie(hobbie) {
    this.hobbieService.addHobbie(hobbie).subscribe((res: any) => {
      this.hobbies.push(res.hobbie)
      this.hobbie = { name: ""}
      this.toastr.success('Hobbie added successfully', '');

    })

  }
  editHobbie(item) {

    this.hobbieService.editHobbie(item).subscribe((res: any) => {
      console.log(res)
      this.toastr.success('Hobbie Updated', '');
    })
  }
  removeHobbie(id) {
    this.hobbieService.deleteHobbie(id).subscribe((res: any) => {
      let index = this.hobbies.findIndex(x => x.id == id);
      this.hobbies = this.hobbies.filter(function (el) { return el.id != id });
      console.log(this.hobbies)
      this.toastr.success('Remove successfully', '');

    })

  }

  public handleAddressChange(address: Address) {
    this.f.address.setValue(address.formatted_address)
    this.f.lat.setValue(address.geometry.location.lat())
    this.f.lng.setValue(address.geometry.location.lng())
  }
  uploadCv(files){
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result)
      this.usersService.uploadCV(reader.result).subscribe((res:any)=>{
        if (res.cv) {
          this.pdfFilePath = environment.baseUrl + res.cv
          this.toastr.success(res.message, '');

        } else {
          this.toastr.error(res.message, '');
        }
      })
    }
    reader.readAsDataURL(file)
  }
  previewCv(){
    window.open(this.pdfFilePath, "_blank");
  }

}