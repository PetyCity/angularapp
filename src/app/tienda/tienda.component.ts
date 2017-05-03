import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Product } from './tienda';
import { Category } from 'app/category/category';
import { TiendaService } from './tienda.service';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  	products: Product[];
  	productsMostSales: Product[];
  	categories: Category[];
  	idCategory: number;
  	palabraBusqueda: string;

	constructor(
		private tiendaService: TiendaService,
		private apiService: ApiService,
		private router: Router
	) { }

	ngOnInit() {
		let timer = Observable.timer(0, 5000000000);
		timer.subscribe(() => this.getProducts());
		timer.subscribe(() => this.getMostSales());
		timer.subscribe(() => this.getCategories());
	}

	getProducts(){
		this.tiendaService.getProducts().subscribe(products => this.products = products);
	}
	
	getProductsByCategory(category_id) {
	    if (category_id == 0) { 
	    	this.getProducts();
	    } else {
	    	this.apiService.getProductsByCategory(category_id).subscribe(products => this.products = products);
	    }
	}

	goToProduct (product: Product): void{
		let productLink = ['/products', product.id];
		this.router.navigate(productLink);
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

	getSearchProducts(event){
		let string = event.target.children[0].children[0].value;
		this.palabraBusqueda = string;
		if (string == "") { 
			this.getProducts();
		} else {
			this.apiService.getSearchProducts(string).subscribe(products => this.products = products);
	    }		
	}

	getOrden(idBsuqueda){
		if (idBsuqueda == 1) {
			this.apiService.getOrden("-", this.palabraBusqueda).subscribe(products => this.products = products);
		}else{
			this.apiService.getOrden("", this.palabraBusqueda).subscribe(products => this.products = products);
		}
	}

}
