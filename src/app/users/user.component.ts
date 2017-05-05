import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { User } from './users';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./users.component.css']
})
export class UserComponent implements OnInit {

  id: number;
  routeId: any;
  users: User[];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  )
   {}

  @Input() user: User;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    )
    let userRequest = this.route.params
      .flatMap((params: Params) =>
        this.apiService.getUser(+params['id']));
    userRequest.subscribe(response => this.user = response.json());
  }

  getUsers(){
		this.apiService.getUsers().subscribe(users => this.users = users);
	}

  goToUser (user: User): void{
		let userLink = ['/users', user.id];
		this.router.navigate(userLink);
	}

}
