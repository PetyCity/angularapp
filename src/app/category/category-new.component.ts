import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Category } from './category';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'category-new',
  templateUrl: 'category-new.component.html',
  styleUrls: ['category.component.css']
})
export class CategoryNewComponent {
  
  category = new Category;
  submitted: boolean = false; // check if form is submitted
  id: number;
  routeId: any;

  constructor(private ApiService: ApiService 
  ){}

  createCategory(category: Category){
    this.submitted = true;
    this.ApiService.createCategory(category)
      .subscribe(data => {return true},
      error=> {
        console.log("Error creando la categoría");
        return Observable.throw(error);
      });
  }
}
