import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Publication } from './publication/publication';
import { Category } from './category/category';
import { User } from './users/users';

@Injectable()
export class ApiService {
	private publicationsUrl = 'http://localhost:3000/api/v1/publications';
	private categoriesUrl = 'http://localhost:3000/api/v1/categories';
	private newcategoryUrl = 'http://localhost:3000/api/v1/admin/users/1/categories';
	private userUrl = 'http://localhost:3000/api/v1/admin/users/';
	private usersUrl = 'http://localhost:3000/api/v1/admin/users/1/users/';
	private companyUrl = 'http://localhost:3000/api/v1/admin/users/1/companies';

	constructor(private http: Http) {}

	//GET:  Todos las publicaciones | ruta: publicationsUrl
	getPublications(): Observable<Publication[]> {
		return this.http.get(this.publicationsUrl).map((response: Response) => <Publication[]>response.json().publications)
	}

	//GET: Una sola publicacion | ruta: publicationsUrl
	getPublication(id: number){
		return this.http.get(this.publicationsUrl + "/" + id + '.json');
	}
	//GET:  Todos las categorias | ruta: categoriesUrl
	getCategories(): Observable<Category[]> {
		return this.http.get(this.categoriesUrl).map((response: Response) => <Category[]>response.json().categories)
	}

	//GET: Una sola categoria | ruta: categoriesUrl
	getCategory(id: number){
		return this.http.get(this.categoriesUrl + "/" + id + '.json');
	}

	createCategory(category: Category): Observable<Category> {
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers});
		return this.http.post(this.newcategoryUrl, JSON.stringify(category),
		options).map((res:Response) => res.json());
	}
	
	//GET:  Usuario por id | ruta: userUrl/id
	getUser(id: number){
		return this.http.get(this.userUrl + "/" + id + '.json');
	}

	//GET:  Todos los usuarios | ruta: usersUrl
	getUsers(): Observable<User[]> {
		return this.http.get(this.usersUrl).map((response: Response) => <User[]>response.json().users)
	}

	//GET:  Compañia por id | ruta: userUrl/id
	getCompany(id: number){
		return this.http.get(this.companyUrl + "/" + id + '.json');
	}

	//GET:  Todos los usuarios | ruta: usersUrl
	getCompanies(): Observable<User[]> {
		return this.http.get(this.companyUrl).map((response: Response) => <User[]>response.json().companies)
	}

}