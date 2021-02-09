import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
