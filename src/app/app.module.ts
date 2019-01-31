import { BrowserModule , Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './user/login/login.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import {  AngularFirestore } from 'angularfire2/firestore';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule} from '@angular/forms';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';


let firebaseConfig ={
  apiKey: "AIzaSyBjxEnyMvLJjQu-SPSrmtdPjORVtTLLYG0",
  authDomain: "enroco-b1291.firebaseapp.com",
  databaseURL: "https://enroco-b1291.firebaseio.com",
  projectId: "enroco-b1291",
  storageBucket: "enroco-b1291.appspot.com",
  messagingSenderId: "622719314266"
}

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot( {preventDuplicates: true}),
    HttpClientModule,
    FormsModule,
    UserModule,
    DashboardModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: "login", component: LoginComponent, pathMatch: "full" },
      { path: "", component: LoginComponent, pathMatch: "full" },
      { path: '*', component: LoginComponent },
      { path: '**', component: PagenotfoundComponent }
    ])
  ],
  providers: [Title,AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
