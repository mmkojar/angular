import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BlogpostListComponent } from './blogpost/blogpost-list/blogpost-list.component';
import { BlogpostDetailComponent } from './blogpost/blogpost-detail/blogpost-detail.component';
import { PageComponent } from './cmspage/page/page.component';
import { ContactFormComponent } from './cmspage/contact-form/contact-form.component';

const routes: Routes = [
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: 'blog', component: BlogpostListComponent },
	{ path: 'blog/:id', component: BlogpostDetailComponent, pathMatch: 'prefix' },
	{ path: 'blog/:id/:cat_id', component: BlogpostDetailComponent, pathMatch: 'prefix' },
	{ path: 'page/:slug', component: PageComponent },
	{ path: 'contact', component: ContactFormComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
