import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post/post-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent  } from './contact/contact.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductComponent } from './tienda/product.component';
import { PublicationComponent } from './publication/publication.component';
import { CategoryComponent } from './category/category.component';
import { CategorybyidComponent } from './categorybyid/categorybyid.component';
import { PublicationByIdComponent } from './publication-by-id/publication-by-id.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'posts', component: PostListComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'products', component: TiendaComponent },
    { path: 'products/:id', component: ProductComponent },
    { path: 'publications', component: PublicationComponent },
    { path: 'publications/:id', component: PublicationByIdComponent },
    { path: 'categories', component: CategoryComponent },
    { path: 'categories/:id', component: CategorybyidComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
