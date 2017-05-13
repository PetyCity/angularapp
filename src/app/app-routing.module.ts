import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post/post-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent  } from './contact/contact.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductComponent } from './tienda/product.component';
import { CategoryComponent } from './category/category.component';
import { CategorybyidComponent } from './categorybyid/categorybyid.component';
import { ProductNewComponent } from './tienda/product-new.component';
import { BlogComponent } from './publication/blog.component';
import { PublicationComponent } from './publication/publication.component';
import { BlogNewComponent } from './publication/blog-new.component';
import { CategoryNewComponent } from './category/category-new.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './companies/company.component';MapComponent
import { MapComponent } from './map/map.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'posts', component: PostListComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'products', component: TiendaComponent },
    { path: 'products/new', component: ProductNewComponent },
    { path: 'products/:id', component: ProductComponent },
    { path: 'categories', component: CategoryComponent },
    { path: 'categories/new', component: CategoryNewComponent },
    { path: 'categories/:id', component: CategorybyidComponent },
    { path: 'blog', component: PublicationComponent },
    { path: 'blog/new', component: BlogNewComponent },
    { path: 'blog/:id', component: BlogComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UserComponent },
    { path: 'companies', component: CompaniesComponent },
    { path: 'companies/map', component: MapComponent },
    { path: 'companies/:id', component: CompanyComponent },
    
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
