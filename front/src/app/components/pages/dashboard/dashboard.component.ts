import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user
  id

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("id")
    this.usersService.ShowUser().subscribe(result =>{
      this.user=result
      console.log(this.user)

  })

}}
