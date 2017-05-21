import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Angular2TokenService} from "angular2-token";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'app/api.service';
import { Publication } from '../publication/publication';
import { PublicationService } from '../publication/publication.service';

@Component({
  selector: 'app-profile-publications-commented',
  templateUrl: './profile-publications-comments.html',
  styleUrls: ['./profile.component.css']
})
export class ProfilePublicationsCommentsComponent implements OnInit {
  
  id: number;
  routeId: any;
  publications: Publication[];
  constructor(protected authTokenService:Angular2TokenService,
              protected authService:AuthService,
              private router:Router,
              private route: ActivatedRoute,
              private publicationService: PublicationService,
              private apiService: ApiService,) { }

  ngOnInit() {
    let idperfil = this.authTokenService.currentUserData.id;
    this.publications = ["1"];
    this.getMyPublications(idperfil);
  }
  getMyPublications(id: number){
		this.publicationService.getCommentedPublications(id).subscribe(publications => this.publications = publications);
	}

}
