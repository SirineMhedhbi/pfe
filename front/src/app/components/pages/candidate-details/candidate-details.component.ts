import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';
import { HobbiesService } from 'src/app/services/hobbies.service';
import { LinksService } from 'src/app/services/links.service';
import { SkillsService } from 'src/app/services/skills.service';
import { UsersService } from 'src/app/services/users.service';
import { WorkService } from 'src/app/services/work.service';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as es6printJS from "print-js";
import * as printJS from 'print-js';






@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})

export class CandidateDetailsComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  education = { title: "", degree: "", institute: "", year: "" }
  educations = []
  skill = { name: "", pourcentage: 50 }
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
  public candidat: string = "/candidate-details";
  test


  constructor(private usersService: UsersService, private educationService: EducationService, private skillsService: SkillsService, private linksService: LinksService, private router: ActivatedRoute, private route: Router, private worksService: WorkService, private hobbiesService: HobbiesService) { }

  ngOnInit(): void {
    this.href = this.route.url
    console.log(this.href)
    this.test = this.href.includes(this.candidat)
    console.log(this.test)
    //   this.usersService.candidatList().subscribe((res:any)=>{

    //     this.users=res.users
    //     console.log(this.users)

    // })



    this.usersService.cvUser(this.router.snapshot.paramMap.get('id') || this.id).subscribe((res: any) => {
      console.log(res)
      this.user = res.user
      if (this.user.image) {
        this.filePath = environment.baseUrl + this.user.image
      }
      if (res.links) {
        this.links = res.links[0]

      }
      console.log(this.links)
      this.educations = res.educations
      console.log(this.educations)
      this.skills = res.skills
      console.log(this.skills)
      this.works = res.works
      console.log(this.works)
      this.hobbies = res.hobbies
      console.log(this.hobbies)



    })

  }
  downloadCv() {
    // let doc = new jsPDF();
    // // doc.addHTML(this.content.nativeElement, function() {
    // //    doc.save("obrz.pdf");
    // // });
    // debugger
    // doc.text(this.content.nativeElement.innerHTML, 10, 10);
    // doc.save("a4.pdf");
    // let data = this.content.nativeElement
    // // let data = document.getElementById("maindiv");
    // console.log(data);  
    // html2canvas(data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
    //   console.log(contentDataURL);  
    //   let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
    //   // let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    //   pdf.save('Filename.pdf');   
    // }); 
    // const doc = new jsPDF();

    // const pdfTable = this.content.nativeElement;

    // var html = htmlToPdfmake(pdfTable.innerHTML);

    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
    // let doc = new jspdf();
    // html2canvas(this.content.nativeElement).then(canvas => {
    //     const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
    //     console.log(contentDataURL);  
    //     let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
    //     // let pdf = new jspdf('p', 'cm', 'a4'); //Generates PDF in portrait mode
    //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    //     pdf.save('Filename.pdf');   
    //   }); 
    // const doc = new jsPDF();
   
    // const pdfTable = this.content .nativeElement;
   
    // var html = htmlToPdfmake(pdfTable.innerHTML);
     
    // const documentDefinition = { content: html,styles:{
    //   'html-h3':{
    //     background:'yellow' // it will add a yellow background to all <STRONG> elements
    //   }
    // }};
    // pdfMake.createPdf(documentDefinition).open()
    let doc = new jspdf();
    doc.addHTML(this.content.nativeElement, function() {
       doc.save("obrz.pdf");
    });
  }

  printProcedure(idElToImprim) {

    let innerHTML = this.content.nativeElement.innerHTML
    console.log(innerHTML)
     const mywindow = window.open('', 'PRINT', 'width=2023,height=1000');
     mywindow.document.write(`
     <html>
       <head>
       <link rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
  integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
  crossorigin="anonymous">
         <style>
         
         .single-profile-item {
          margin-bottom: 30px;
       }
        .single-profile-item img {
          width: 100%;
       }
        .single-profile-item .single-profile-left {
          padding: 50px 60px 20px;
          box-shadow: 0px 0px 20px 0px #ddd 87;
       }
        .single-profile-item .single-profile-left .single-profile-contact {
          margin-bottom: 40px;
       }
        .single-profile-item .single-profile-left .single-profile-contact h3 {
          font-weight: 600;
          font-size: 22px;
          color: black;
          margin-bottom: 20px;
       }
        .single-profile-item .single-profile-left .single-profile-contact ul {
          margin: 0;
          padding: 0;
       }
        .single-profile-item .single-profile-left .single-profile-contact ul li {
          list-style-type: none;
          display: flex;
          font-size: 16px;
          color: #858585;
          margin-bottom: 18px;
       }
        .single-profile-item .single-profile-left .single-profile-contact ul li:last-child {
          margin-bottom: 0;
       }
        .single-profile-item .single-profile-left .single-profile-contact ul li i {
          display: inline-block;
          background: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          top: 2px;
          margin-right: 6px;
          font-size: 22px;
       }
        .single-profile-item .single-profile-left .single-profile-contact ul li a {
          color: #858585;
          display: inline-block;
       }
        .single-profile-item .single-profile-left .single-profile-contact ul li a:hover {
          color: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
       }
        .single-profile-item .single-profile-left .single-profile-social {
          margin-bottom: 40px;
       }
        .single-profile-item .single-profile-left .single-profile-social h3 {
          font-weight: 600;
          font-size: 22px;
          color: black;
          margin-bottom: 20px;
       }
        .single-profile-item .single-profile-left .single-profile-social ul {
          margin: 0;
          padding: 0;
       }
        .single-profile-item .single-profile-left .single-profile-social ul li {
          list-style-type: none;
          display: flex;
          margin-bottom: 18px;
       }
        .single-profile-item .single-profile-left .single-profile-social ul li:last-child {
          margin-bottom: 0;
       }
        .single-profile-item .single-profile-left .single-profile-social ul li i {
          display: inline-block;
          background: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          top: 2px;
          margin-right: 6px;
          font-size: 22px;
       }
        .single-profile-item .single-profile-left .single-profile-social ul li a {
          color: #858585;
          display: inline-block;
       }
        .single-profile-item .single-profile-left .single-profile-social ul li a:hover {
          color: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
       }
        .single-profile-item .single-profile-left .single-profile-skills h3 {
          font-weight: 600;
          font-size: 22px;
          color: black;
          margin-bottom: 20px;
       }
        .single-profile-item .single-profile-left .single-profile-skills .skill {
          margin-bottom: 30px;
       }
        .single-profile-item .single-profile-left .single-profile-skills .skill p {
          color: #9a9a9a;
          margin-bottom: 17px;
       }
        .single-profile-item .single-profile-left .single-profile-skills .skill .skill1:before {
          display: none;
       }
        .single-profile-item .single-profile-left .single-profile-skills .skill .skill2 {
          width: 90%;
       }
        .single-profile-item .single-profile-left .single-profile-skills .skill .skill3 {
          width: 75%;
       }
        .single-profile-item .single-profile-right .single-profile-name {
          margin-bottom: 70px;
       }
        .single-profile-item .single-profile-right .single-profile-name h2 {
          font-weight: 700;
          font-size: 38px;
          color: #51504e;
          margin-bottom: 8px;
       }
        .single-profile-item .single-profile-right .single-profile-name span {
          display: block;
          font-size: 18px;
          color: #999897;
          font-weight: 500;
          margin-bottom: 5px;
       }
        .single-profile-item .single-profile-right .single-profile-name p {
          margin-bottom: 30px;
          color: #838383;
          font-size: 16px;
       }
        .single-profile-item .single-profile-right .single-profile-name a {
          display: inline-block;
          color: #fff;
          background: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
          font-weight: 600;
          font-size: 16px;
          padding: 15px 15px;
          margin-right: 20px;
          width: 200px;
          text-align: center;
       }
        .single-profile-item .single-profile-right .single-profile-name a i {
          margin-left: 4px;
       }
        .single-profile-item .single-profile-right .single-profile-name a:hover {
          background: linear-gradient(270deg, #38a745 0%, #4cce5b 63%);
       }
        .single-profile-item .single-profile-right .single-profile-textarea {
          padding-left: 60px;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-heading {
          position: relative;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-heading:before {
          position: absolute;
          content: '';
          width: 18px;
          height: 3px;
          background: #dbf4de;
          left: -31px;
          top: 13px;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-heading span {
          width: 13px;
          height: 13px;
          transform: rotate(45deg);
          position: absolute;
          top: 9px;
          left: -56px;
          display: inline-block;
          border: 4px solid;
          border-image-source: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
          border-image-slice: 1;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-heading h3 {
          font-weight: 600;
          font-size: 22px;
          background: linear-gradient(90deg, rgba(56, 167, 69, 1) 0%, rgba(76, 206, 91, 1) 63%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph {
          position: relative;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph:before {
          position: absolute;
          content: '';
          width: 3px;
          height: 100%;
          left: -51px;
          top: 0;
          background: #d9f1dc;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph .single-profile-p {
          padding-bottom: 10px;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph p {
          margin-bottom: 0;
          color: #838383;
          padding-top: 10px;
          padding-bottom: 26px;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph ul {
          margin: 0;
          padding: 0;
          padding-top: 14px;
          padding-bottom: 30px;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph ul li {
          list-style-type: none;
          display: block;
          color: #838383;
          margin-bottom: 15px;
       }
        .single-profile-item .single-profile-right .single-profile-textarea .single-profile-paragraph ul li:last-child {
          margin-bottom: 0;
       }
        
         </style>
       </head>
       <body>${innerHTML}</body>
     </html>`);
     mywindow.document.close();
     mywindow.focus();
     setTimeout(() => {
       mywindow.print();
       
     }, 400);
  }
printTest() {
    
    es6printJS({printable: "print-section", type: 'html',css:"/src/test.css" ,scanStyles:true });
  }
}




