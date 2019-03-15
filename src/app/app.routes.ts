import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormPageComponent } from './form-page/form-page.component';
import { ListPageComponent } from './list-page/list-page.component';


const routes: Routes =[
      { path: '',   component: FormPageComponent},
      { path: 'list',   component: ListPageComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: false })
  ],
  providers: [],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }