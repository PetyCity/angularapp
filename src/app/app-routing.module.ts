import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post/post-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent  } from './contact/contact.component';
import { TiendaComponent } from './tienda/tienda.component';
import { ProductComponent  } from './product/product.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomepageComponent },
    { path: 'posts', component: PostListComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'products', component: TiendaComponent },
    { path: 'product', component: ProductComponent },
]

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
