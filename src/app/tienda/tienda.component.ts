import { Component, OnInit } from '@angular/core';
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

	constructor(private tiendaService: TiendaService) { }

	ngOnInit() {
		let timer = Observable.timer(0, 5000);
		timer.subscribe(() => this.getProducts());
	}

	getProducts(){
		this.tiendaService.getProducts().subscribe(products => this.products = products);
	}
}
