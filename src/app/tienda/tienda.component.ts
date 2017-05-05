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
  	palabra: string;
  	orden: string;
  	parametro: string;
  	

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

		this.idCategory = 0;
		this.orden = "";
		this.parametro = "name_product";

	}

	getProducts(){
		this.tiendaService.getProducts().subscribe(products => this.products = products);
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

	getProductsByCategory(category_id) {
		this.idCategory = category_id;
		this.getProductosFiltro(this.idCategory,this.palabra, this.orden, this.parametro);
		
	}

	getparametroBusqueda(event){
		this.parametro = event.target.options[event.target.options.selectedIndex].id;
		this.getProductosFiltro(this.idCategory,this.palabra, this.orden, this.parametro);
	}

	getSearchProducts(event){

		let palabra = event.target.children[0].children[0].value;
		console.log(palabra);
		
			this.palabra = event.target.children[0].children[0].value;
			this.getProductosFiltro(this.idCategory,this.palabra, this.orden, this.parametro);
		
	}

	getOrden(caracter){
		this.orden = caracter;
		this.getProductosFiltro(this.idCategory,this.palabra, this.orden, this.parametro);
	}

	getProductosFiltro(categoria, palabra, orden, parametro){
		console.log(categoria,palabra,orden,parametro);
		this.apiService.getProductosFiltro(categoria, palabra, orden, parametro).subscribe(products => this.products = products);
	}
}
