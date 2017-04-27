import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Publication } from './publication';
import { PublicationService } from './publication.service';

@Component({
  selector: 'blog-new',
  templateUrl: 'blog-new.component.html',
  styleUrls: ['publication.component.css']
})
export class BlogNewComponent {
  
  publication = new Publication;
  submitted: boolean = false; // check if form is submitted
  id: number;
  routeId: any;

  constructor(private publicationService: PublicationService 
  ){}

  createPublication(publication: Publication){
    this.submitted = true;
    this.publicationService.createPublication(publication)
      .subscribe(data => {return true},
      error=> {
        console.log("Error creando la publicación");
        return Observable.throw(error);
      });
  }
}
