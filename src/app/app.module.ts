import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list.component';
import { PostService } from './post/post.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HomepageComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
