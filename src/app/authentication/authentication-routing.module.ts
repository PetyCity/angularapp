import { NgModule }       from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { AuthenticationService }    from './authentication.service';

import { LoginComponent }          from './login/login.component';
import { SignUpComponent }         from './signup/signup.component';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'login', redirectTo: '/log-in' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'signup', redirectTo: '/sign-up' }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthenticationService,
  ]
})
export class AuthenticationRoutingModule {}
