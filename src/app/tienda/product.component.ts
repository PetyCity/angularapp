import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Product } from './tienda';
import { Router } from '@angular/router';
import { TiendaService } from './tienda.service';
import { ApiService } from 'app/api.service';
import { Category } from 'app/category/category';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: number;
  routeId: any;
  productsMostSales: Product[];
  categories: Category[];

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private tiendaService: TiendaService,
    private router: Router,
    private apiService: ApiService
  ){}

  @Input() product: Product;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    )
    let productRequest = this.route.params
      .flatMap((params: Params) =>
        this.tiendaService.getProduct(+params['id']));
    productRequest.subscribe(response => this.product = response.json());
  }
  
  	getMostSales(){
		this.tiendaService.getMostSales().subscribe(products => this.productsMostSales = products);
	}


	getCategories(){
		this.apiService.getCategories().subscribe(categories => this.categories = categories);
	}

	goToCategory (category: Category): void{
		let categoryLink = ['/categories', category.id];
		this.router.navigate(categoryLink);
	}

}
