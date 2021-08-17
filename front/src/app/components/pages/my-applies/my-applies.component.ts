import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplyService } from 'src/app/services/apply.service';
import { DialogComponent } from "src/app/components/common/dialog/dialog.component";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-my-applies',
  templateUrl: './my-applies.component.html',
  styleUrls: ['./my-applies.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyAppliesComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['job', 'status', 'note'];
  expandedElement: any | null;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  myApplies
  constructor(private applyService: ApplyService, private matDialog: MatDialog) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {

    this.applyService.getMyapplies().subscribe((res: any) => {

      this.myApplies = res
      this.dataSource.data = this.myApplies
      console.log(this.myApplies)
    })
  }
  removeApply(id) {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: { title: "Are you sure to delete this Apply? " }
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true) {
        this.applyService.removeApply(id).subscribe((res: any) => {
          console.log(res)
          this.dataSource.data = this.dataSource.data.filter(x => x.id !== id)
        })
      }
    });

  }
}
