import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Publication } from './publication/publication';
import { Category } from './category/category';
import { Product } from './tienda/tienda';

@Injectable()
export class ApiService {
	private publicationsUrl = 'http://localhost:3000/api/v1/publications';
	private categoriesUrl = 'http://localhost:3000/api/v1/categories';

	constructor(private http: Http) {}

	//GET:  Todos las publicaciones | ruta: publicationsUrl
	getPublications(): Observable<Publication[]> {
		return this.http.get(this.publicationsUrl).map((response: Response) => <Publication[]>response.json().publications);
	}

	//GET: Una sola publicacion | ruta: publicationsUrl
	getPublication(id: number){
		return this.http.get(this.publicationsUrl + "/" + id + '.json');
	}
	//GET:  Todos las categorias | ruta: categoriesUrl
	getCategories(): Observable<Category[]> {
		return this.http.get(this.categoriesUrl).map((response: Response) => <Category[]>response.json().categories);
	}

	//GET: Una sola categoria | ruta: categoriesUrl
	getCategory(id: number){
		return this.http.get(this.categoriesUrl + "/" + id + '.json');
	}

	//GET: Productos de una categoria | ruta: categoriesUrl
	getProductsByCategory(id: number){
		let url = this.categoriesUrl + "/" + id + "/" + "products";
		return this.http.get(url).map((response: Response) => <Product[]>response.json().products)
	}

	
}