import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Company } from './companies';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompanyComponent implements OnInit {

  companies: Company[];
  id: number;
  routeId: any;

  constructor(
    private http: Http,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  )
   {}
  
  @Input() company: Company;

  ngOnInit() {
   this.routeId = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
      }
      )
      let companyRequest = this.route.params
      .flatMap((params: Params) =>
        this.apiService.getCompany(+params['id']));
    companyRequest.subscribe(response => this.company = response.json());
  }

  getCompanies(){
		this.apiService.getCompanies().subscribe(companies => this.companies = companies);
	}

  goToCompany (company: Company): void{
		let companyLink = ['/companies', company.id];
		this.router.navigate(companyLink);
	}

}
