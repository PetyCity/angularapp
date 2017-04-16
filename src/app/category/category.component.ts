import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Category } from './category';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

	categories: Category[];

	constructor(
		private apiService: ApiService
	) { }

	ngOnInit() {
		let timer = Observable.timer(0, 500000000000);
		timer.subscribe(() => this.getCategories());
	}

	getCategories(){
		this.apiService.getCategories().subscribe(categories => this.categories = categories);
	}

}
