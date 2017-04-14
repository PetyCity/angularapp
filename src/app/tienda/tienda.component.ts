import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Product } from './tienda';
import { TiendaService } from './tienda.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {

  	products: Product[];

	constructor(
		private tiendaService: TiendaService,
		private router: Router
	) { }

	ngOnInit() {
		let timer = Observable.timer(0, 500000000000);
		timer.subscribe(() => this.getProducts());
	}

	getProducts(){
		this.tiendaService.getProducts().subscribe(products => this.products = products);
	}

	goToProduct (product: Product): void{
		let productLink = ['/products', product.id];
		this.router.navigate(productLink);
	}

	
}
