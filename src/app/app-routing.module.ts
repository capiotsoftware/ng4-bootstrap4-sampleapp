import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { IndexSubPage1Component } from './index/subPages/subPage1/subPage1.component';
import { IndexSubPage2Component } from './index/subPages/subPage2/subPage2.component';
import { Page1Component } from "./page1/page1.component";
import { Page2Component } from "./page2/page2.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'index',
    component: IndexComponent,
    children: [
      { path: 's1', component: IndexSubPage1Component },
      { path: 's2', component: IndexSubPage2Component }
    ]
  },
  { path: 'page1', component: Page1Component },
  { path: 'page2', component: Page2Component }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
