import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Publication } from './publication/publication';
import { Category } from './category/category';
import { Company } from './tienda/company';
import { Product } from './tienda/tienda';

@Injectable()
export class ApiService {
	private publicationsUrl = 'http://localhost:3000/api/v1/publications';
	private categoriesUrl = 'http://localhost:3000/api/v1/categories';
	private companiesUrl = 'http://localhost:3000/api/v1/companies';
	private productSearchUrl = 'http://localhost:3000/api/v1/products/search?q='
	private productosOrdenUrl = 'http://localhost:3000/api/v1/products/search?q='

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

	//GET:  Todos las compañias | ruta: companiesUrl
	getCompanies(): Observable<Company[]> {
		return this.http.get(this.companiesUrl).map((response: Response) => <Company[]>response.json().companies);
	}

	//GET: Productos | ruta:  productSearchUrl

	getSearchProducts(string: string):Observable<Product[]>{
		let url = this.productSearchUrl + string + "&select_product=name_product, value";
		return this.http.get(url).map((response: Response) => <Product[]>response.json().products);
	}

	getOrden(orden: string, string: string){
		let url = this.productosOrdenUrl+ string + "&sort="+ orden + "name_product";
		return this.http.get(url).map((response: Response) => <Product[]>response.json().products);
	}
}