import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Product } from './tienda';
import { TiendaService } from './tienda.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id: number;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private tiendaService: TiendaService 
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
  
}
