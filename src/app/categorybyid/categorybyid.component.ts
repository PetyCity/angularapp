import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Category } from 'app/category/category';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-categorybyid',
  templateUrl: './categorybyid.component.html',
  styleUrls: ['./categorybyid.component.css']
})
export class CategorybyidComponent implements OnInit {

	id: number;
  	routeId: any;

	constructor(
		private http: Http,
	    private route: ActivatedRoute,
	    private apiService: ApiService
	) { }

	@Input() category: Category;

	ngOnInit() {
		this.routeId = this.route.params.subscribe(
	      params => {
	        this.id = +params['id'];
	      }
	    )
	    let categoryRequest = this.route.params
	      .flatMap((params: Params) =>
	        this.apiService.getCategory(+params['id']));
	    categoryRequest.subscribe(response => this.category = response.json());
	}
	
}
