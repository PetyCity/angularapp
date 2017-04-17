import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Publication } from './publication';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

	publications: Publication[];

	constructor(
		private apiService: ApiService,
		private router: Router
	) { }

	ngOnInit() {
		let timer = Observable.timer(0, 500000000000);
		timer.subscribe(() => this.getPublications());
	}

	getPublications(){
		this.apiService.getPublications().subscribe(publications => this.publications = publications);
	}

	goToPublication (publication: Publication): void{
		let publicationLink = ['/publications', publication.id];
		this.router.navigate(publicationLink);
	}

}
