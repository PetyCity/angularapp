import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2PaginationModule} from 'ng2-pagination';
import { Angular2TokenService } from 'angular2-token';
import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list.component';
import { PostService } from './post/post.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { TiendaComponent } from './tienda/tienda.component';
import { TiendaService } from './tienda/tienda.service';
import { ApiService } from './api.service';
import { ProductComponent } from './tienda/product.component';
import { CategorybyidComponent } from './categorybyid/categorybyid.component';
import { CategoryComponent } from './category/category.component';
import { ProductNewComponent } from './tienda/product-new.component';
import { PublicationComponent } from './publication/publication.component';
import { BlogComponent } from './publication/blog.component';
import { BlogNewComponent } from './publication/blog-new.component';
import { PublicationService } from './publication/publication.service';
import { LoginFormComponent } from './authentication/loginform.component';
import { RegisterFormComponent } from './authentication/loginregister.component';
import { AuthService } from "./auth.service";

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HomepageComponent,
    ContactComponent,
    ProductComponent,
    ProductNewComponent,
    TiendaComponent,
    BlogNewComponent,
    BlogComponent,
    CategoryComponent,
    CategorybyidComponent,
    PublicationComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule
  ],
  providers: [
    TiendaService,
    PublicationService,
    PostService,
    ApiService,
    Angular2TokenService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
