import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.ShowUser().subscribe(result =>{
      this.user=result
    })
    
    
  }

}
