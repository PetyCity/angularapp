import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from './users';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private apiService: ApiService,
    private router: Router,
  )
   {}

  ngOnInit() {
   let timer = Observable.timer(0, 50000);
	 timer.subscribe(() => this.getUsers());
  }

  getUsers(){
		this.apiService.getUsers().subscribe(users => this.users = users);
	}

  goToUser (user: User): void{
		let userLink = ['/users', user.id];
		this.router.navigate(userLink);
	}

}
