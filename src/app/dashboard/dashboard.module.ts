import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../auth.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      {path: 'home', component:HomeComponent,canActivate:[AuthGuardService] }])
  ],
  declarations: [HomeComponent],
  providers:[AuthGuardService,AuthService],
  exports: [RouterModule]
})
export class DashboardModule { }
