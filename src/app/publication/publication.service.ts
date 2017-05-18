import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Publication } from './publication';

@Injectable()
export class PublicationService {
	private publicationUrl = 'http://localhost:3000/api/v1/publications';
	private newpublicationUrl = 'http://localhost:3000/api/v1/costum/users';

	constructor(private http: Http) {}

	getPublications(): Observable<Publication[]> {
		return this.http.get(this.publicationUrl).map((response: Response) => <Publication[]>response.json().publications)
	}

	getPublication(id: number){
		return this.http.get(this.publicationUrl + "/" + id + '.json');
	}

	createPublication(publication: Publication, id:number): Observable<Publication> {
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers});
		return this.http.post(this.newpublicationUrl+"/"+id+"/publications", JSON.stringify(publication),
		options).map((res:Response) => res.json());
	}

	getMyPublications(id: number): Observable<Publication[]> {
		return this.http.get(this.newpublicationUrl+"/"+id+"/publications").map((response: Response) => <Publication[]>response.json().publications)
	}
}