import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppPasswordDirective } from './app-password.directive';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forChild([
      { path: 'sign-up', component: SignupComponent },
      { path: 'forget-password', component: ForgetPasswordComponent }
    ])
  ],
  declarations: [LoginComponent,SignupComponent, ForgetPasswordComponent,AppPasswordDirective]
})
export class UserModule { }
