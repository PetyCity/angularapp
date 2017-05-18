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
  selector: 'app-profile-mypublications',
  templateUrl: './profile-mypublications.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileMyPublicationsComponent implements OnInit {
  
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
   
    console.log("id perfil: " + idperfil);
    this.getMyPublications(idperfil);
  }
  getMyPublications(id: number){
    console.log("id perfil: ");
		this.publicationService.getMyPublications(id).subscribe(publications => this.publications = publications);
		console.log(this.publications);
	}

}
