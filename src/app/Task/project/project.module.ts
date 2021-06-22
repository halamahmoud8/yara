import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ProjectRoutingModule } from './project-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderPageComponent } from './header-page/header-page.component';
import { FooterPageComponent } from './footer-page/footer-page.component';


import {MatToolbarModule} from '@angular/material/toolbar'; 

@NgModule({
  declarations: [HomePageComponent, HeaderPageComponent, FooterPageComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,MatToolbarModule,MatInputModule,MatButtonModule
  ]
})
export class ProjectModule { }
