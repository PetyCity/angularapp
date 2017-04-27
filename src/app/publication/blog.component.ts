import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Publication } from './publication';
import { PublicationService } from './publication.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./publication.component.css']
})
export class BlogComponent implements OnInit {

  id: number;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private publicationService: PublicationService 
  ){}

  @Input() publication: Publication;

  ngOnInit() {
    this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
    )
    let publicationRequest = this.route.params
      .flatMap((params: Params) =>
        this.publicationService.getPublication(+params['id']));
    publicationRequest.subscribe(response => this.publication = response.json());
  }
}
