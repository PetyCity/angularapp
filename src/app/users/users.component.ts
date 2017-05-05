import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { User } from './user';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	users: User[];
	palabra: string;

	constructor(
		private apiService: ApiService,
		private router: Router) { }

	ngOnInit() {
		let timer = Observable.timer(0, 5000000000);
		timer.subscribe(() => this.getUsersAdmin());
		this.palabra = "";
		
	}

	getUsersAdmin(){
		this.apiService.getUsersAdmin(this.palabra).subscribe(users => this.users = users);
	}



}
