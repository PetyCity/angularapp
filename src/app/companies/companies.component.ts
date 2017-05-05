import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Company } from './companies';
import { ApiService } from 'app/api.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[];

  constructor(
    private apiService: ApiService,
    private router: Router,
  )
   {}

  ngOnInit() {
   let timer = Observable.timer(0, 50000);
	 timer.subscribe(() => this.getCompanies());
  }

  getCompanies(){
		this.apiService.getCompanies().subscribe(companies => this.companies = companies);
	}

  goToCompany (company: Company): void{
		let companyLink = ['/companies', company.id];
		this.router.navigate(companyLink);
	}

}
