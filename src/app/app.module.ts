import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore'
import { AngularFireStorage, AngularFireStorageModule, StorageBucket} from '@angular/fire/storage'


import { environment } from '../environments/environment';

//formularios
import { ReactiveFormsModule} from '@angular/forms';

//material

import { MaterialModule } from './material/material.module';

import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ItemComponent } from './components/item/item.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { ContainerAppComponent } from './components/container-app/container-app.component';

//Buscardor Home
import { SearchComponent } from '../app/components/search/search.component';
import { ModalComponent } from './components/modal/modal.component';
import { EditProductoComponent } from './components/edit-producto/edit-producto.component';
import { NewProductoComponent } from './components/new-producto/new-producto.component';




@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ItemComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LayoutComponent,
    SearchComponent,
    ContainerAppComponent,
    ModalComponent,
    EditProductoComponent,
    NewProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MaterialModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  entryComponents:[ModalComponent],
  providers: [
    {provide : StorageBucket, useValue:'gs://ngblog-46b68.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
