import { Injectable } from '@angular/core';
import { Router }     from '@angular/router';
import { Response }   from '@angular/http';

import { Angular2TokenService } from 'angular2-token';
import { Observable }           from 'rxjs/Observable';

@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    private tokenService: Angular2TokenService,
    public router: Router) {
    this.tokenService.init({
        signInPath: 'http://localhost:3000/api/v1/auth/sign_in',
        registerAccountPath: 'http://localhost:3000/api/v1/auth'
    });
    }

    logIn(email: string, password: string): Observable<Response> {
      return this.tokenService.signIn({ email: email,
                                       password: password });
    }

    signUp(email: string, password: string, document: string, name: string): Observable<Response> {
      return this.tokenService.registerAccount({ email: email,
                                                 password: password,
                                                 passwordConfirmation: password,
                                                 document:  document,
                                                 name_user: name});
    }

  proccessOauthCallback(): void {
    this.tokenService.processOAuthCallback();
    this.redirectAfterLogin();
  }

  logOut(): void {
    this.redirectUrl = undefined;
    this.tokenService.signOut();
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.tokenService.userSignedIn();
  }

  redirectAfterLogin(): void {
    let redirectTo = this.redirectUrl ? this.redirectUrl : '/';
    this.redirectUrl = undefined;
    this.router.navigate([redirectTo]);
  }
}
