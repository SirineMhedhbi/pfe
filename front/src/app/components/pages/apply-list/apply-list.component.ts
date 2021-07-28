import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { state, style, transition, trigger,animate } from '@angular/animations';
import { ApplyService } from 'src/app/services/apply.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-apply-list',
  templateUrl: './apply-list.component.html',
  styleUrls: ['./apply-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ApplyListComponent implements OnInit,AfterViewInit  {
  offer
  candidatlist=[]
  filtredList = []
  columnsToDisplay = ['name', 'first_name', 'email', 'phone', 'note'];
  expandedElement: any | null;
  dataSource = new MatTableDataSource<any>();
  environment 
  filtre = {query:"", status:""}
  selectedValue

  
  

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private jobsService: JobsService, private router: ActivatedRoute, private applyService: ApplyService, private changeDetectorRefs: ChangeDetectorRef) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.environment = environment 

     
      this.applyService.candidatList(this.router.snapshot.paramMap.get('id'),null).subscribe((res: any) => {

        this.candidatlist = res
        this.dataSource.data =  this.candidatlist
        console.log(this.candidatlist)
      })
      
  }
  accept_refuse(id,status){
    
    this.applyService.acceptRefuse(id,status).subscribe((res: any) => {
      console.log(res)
      this.dataSource.data.find(x=>x.id == id).status = status

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
     this.filtre.query = filterValue
     this.filtredList = this.candidatlist.filter(x => x.user.name.includes(filterValue) || x.user.nickname.includes(filterValue) || x.user.email.includes(filterValue) || x.user.phone.toString().includes(filterValue) ||  x.note.toString().includes(filterValue))
     this.dataSource.data =  this.filtredList


    // this.applyService.candidatList(this.router.snapshot.paramMap.get('id'),this.filtre).subscribe((res: any) => {


    //   this.candidatlist = res
    //   this.dataSource.data =  this.candidatlist
    //   console.log(this.candidatlist)
    // })    
  }
  statusFilter(){
    this.filtre.status = this.selectedValue
    this.applyService.candidatList(this.router.snapshot.paramMap.get('id'),this.filtre).subscribe((res: any) => {
      this.candidatlist = res
      if (this.filtre.query != "") {
        this.filtredList = this.candidatlist.filter(x => x.user.name.includes(this.filtre.query) || x.user.nickname.includes(this.filtre.query) || x.user.email.includes(this.filtre.query) || x.user.phone.toString().includes(this.filtre.query) ||  x.note.toString().includes(this.filtre.query))
        this.dataSource.data =  this.filtredList
      }else{
        this.dataSource.data =  this.candidatlist
      }
      
    }) 
  }

  

}
