import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Ng2PaginationModule} from 'ng2-pagination';

import { AppComponent } from './app.component';
import { PostListComponent } from './post/post-list.component';
import { PostService } from './post/post.service';
import { HomepageComponent } from './homepage/homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactComponent } from './contact/contact.component';
import { TiendaComponent } from './tienda/tienda.component';
import { TiendaService } from './tienda/tienda.service';
import { ProductComponent } from './tienda/product.component';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    HomepageComponent,
    ContactComponent,
    ProductComponent,
    TiendaComponent,
    ViewProductComponent
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
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
